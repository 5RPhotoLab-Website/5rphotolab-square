import { pool } from "../config/database.js";
import { squareClient, squareEnv } from "../config/square.js";
import { randomUUID } from "crypto";
import { sendOrderConfirmation, sendAdminNotification } from "./emailService.js";

// POST /orders/checkout PAYMENTS LINK API
// const createCheckout = async (req, res) => {
//     try {
//         const session_id = req.headers["x-session-id"];
//         if (!session_id) return res.status(400).json({ error: "Missing session" });

//         const { notes } = req.body;

//         // Pull cart
//         const cartResult = await pool.query(
//             `SELECT * FROM carts WHERE session_id = $1 LIMIT 1`,
//             [session_id]
//         );
//         if (cartResult.rows.length === 0 || cartResult.rows[0].cart_data.products.length === 0) {
//             return res.status(400).json({ error: "Cart is empty" });
//         }

//         const cart = cartResult.rows[0];
//         const products = cart.cart_data.products;

//         const lineItems = products.map((p) => ({
//             catalogObjectId: p.variation_id,
//             quantity: String(p.quantity),
//         }));

//         const totalAmount = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);

//         const orderResult = await pool.query(
//             `INSERT INTO orders 
//                 (session_id, total_amount, payment_status, notes)
//              VALUES ($1,$2,'PENDING',$3)
//              RETURNING *`,
//             [
//                 session_id,
//                 totalAmount,
//                 notes || null
//             ]
//         );

//         const order = orderResult.rows[0];


//         const response = await squareClient.checkout.paymentLinks.create({
//             idempotencyKey: randomUUID(),
//             order: {
//                 locationId: squareEnv.locationId,
//                 lineItems,
//             },
//             checkoutOptions: {
//                 redirectUrl: `${process.env.CLIENT_URL}/order/confirmation?orderId=${order.id}`,
//                 askForShippingAddress: true,
//             },
//         });

//         if (!response.paymentLink) {
//             return res.status(500).json({ error: "Failed to create checkout link" });
//         }

//         await pool.query(
//             `UPDATE orders SET square_order_id = $1, updated_at = NOW() WHERE id = $2`,
//             [response.paymentLink.orderId, order.id]
//         );

//         res.status(201).json({ checkoutUrl: response.paymentLink.url, orderId: order.id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };


// GET /orders/:orderId PAYMENTS API
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const session_id = req.headers["x-session-id"];

        const result = await pool.query(
            `SELECT * FROM orders WHERE id = $1 AND session_id = $2`,
            [orderId, session_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /orders/:orderId/items PAYMENTS API
// const getOrderItems = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const session_id = req.headers["x-session-id"];

//         // First get your DB order to verify session and get square_order_id
//         const result = await pool.query(
//             `SELECT * FROM orders WHERE id = $1 AND session_id = $2`,
//             [orderId, session_id]
//         );

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "Order not found" });
//         }

//         const order = result.rows[0];
//         if (!order.square_order_id) {
//             return res.status(404).json({ error: "No Square order found" });
//         }

//         // Fetch from Square Orders API
//         const response = await squareClient.orders.get({ orderId: order.square_order_id });

//         const lineItems = response.order.lineItems || [];

//         const items = lineItems.map(item => ({
//             name: item.name,
//             quantity: item.quantity,
//             unitPrice: item.basePriceMoney ? (Number(item.basePriceMoney.amount) / 100).toFixed(2) : "0.00",
//             totalPrice: item.totalMoney ? (Number(item.totalMoney.amount) / 100).toFixed(2) : "0.00"
//         }));

//         const squareTotal = response.order.totalMoney
//             ? (Number(response.order.totalMoney.amount) / 100).toFixed(2)
//             : null;

//         res.status(200).json({ items, squareTotal });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// };

// GET /orders/:orderId/items WEB PAYMENTS SDK
const getOrderItems = async (req, res) => {
    try {
        const { orderId } = req.params;
        const session_id = req.headers["x-session-id"];

        const orderResult = await pool.query(
            `
            SELECT id, total_amount
            FROM orders
            WHERE id = $1
            AND session_id = $2
            `,
            [orderId, session_id]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({
                error: "Order not found"
            });
        }

        const itemsResult = await pool.query(
            `
            SELECT
                id,
                product_name,
                unit_price,
                quantity,
                line_total,
                modifiers
            FROM order_items
            WHERE order_id = $1
            ORDER BY id
            `,
            [orderId]
        );

        res.json({
            items: itemsResult.rows,
            total: orderResult.rows[0].total_amount
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
};

// POST /orders/pay
const payOrder = async (req, res) => {
    const client = await pool.connect();

    let localOrder = null;
    let squareOrder = null;
    let payment = null;

    try {
        const session_id = req.headers["x-session-id"];
        const { sourceId, full_name, email, billing, shipping, phone_number, notes } = req.body;
        if (!email?.trim()) {
            return res.status(400).json({
                error: "Email is required."
            });
        }
        if (
            !billing?.address_line1 ||
            !billing?.city ||
            !billing?.state ||
            !billing?.zip ||
            !billing?.country
        ) {
            return res.status(400).json({
                error: "Please complete your billing address."
            });
        }

        if (!session_id) {
            return res.status(400).json({ error: "Missing session" });
        }

        if (!sourceId) {
            return res.status(400).json({ error: "Missing sourceId" });
        }

        //
        // Get cart
        //
        const cartResult = await client.query(
            `
            SELECT cart_data
            FROM carts
            WHERE session_id = $1
            LIMIT 1
            `,
            [session_id]
        );

        if (
            cartResult.rows.length === 0 ||
            !cartResult.rows[0].cart_data.products.length
        ) {
            return res.status(400).json({
                error: "Cart is empty"
            });
        }

        const products = cartResult.rows[0].cart_data.products;

        //
        // Recalculate total
        //
        const totalAmount = products.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );

        //
        // Build Square line items
        //
        // const lineItems = products.map(product => ({
        //     catalogObjectId: product.variation_id,
        //     quantity: String(product.quantity)
        // }));
        const lineItems = products.map(product => {
            const squareModifiers = Object.values(product.modifiers || {})
                .filter(modifier => modifier?.modifierId)
                .map(modifier => ({
                    catalogObjectId: modifier.modifierId
                }));

            return {
                catalogObjectId: product.variation_id,
                quantity: String(product.quantity),
                ...(squareModifiers.length > 0
                    ? { modifiers: squareModifiers }
                    : {})
            };
        });


        //
        // IMPORTANT:
        // Create a local order BEFORE charging Square.
        //
        // These keys are generated ONCE for this local order.
        //
        const squareOrderIdempotencyKey = randomUUID();
        const squarePaymentIdempotencyKey = randomUUID();

        //
        // Determine which address Square should use
        // as the fulfillment/shipping address.
        //
        const recipientAddress = shipping?.requested
            ? {
                addressLine1: shipping.address_line1,
                addressLine2: shipping.address_line2 || undefined,
                locality: shipping.city,
                administrativeDistrictLevel1: shipping.state,
                postalCode: shipping.zip,
                country: shipping.country || "US"
            }
            : {
                addressLine1: billing.address_line1,
                addressLine2: billing.address_line2 || undefined,
                locality: billing.city,
                administrativeDistrictLevel1: billing.state,
                postalCode: billing.zip,
                country: billing.country
            };

        //
        // ---------------------------------------------------------
        // STEP 1: Create local DB order
        // ---------------------------------------------------------
        //
        //
        // Create order
        //
        await client.query("BEGIN");
        try {
            const orderResult = await client.query(
                `
            INSERT INTO orders
            (
                session_id,
                email,
                shipping_requested,
                shipping_address_line1,
                shipping_address_line2,
                shipping_city,
                shipping_state,
                shipping_zip,
                shipping_country,
                total_amount,
                payment_status,
                square_payment_idempotency_key,
                square_order_idempotency_key,
                phone_number,
                notes,
                full_name,
                billing_address_line1,
                billing_address_line2,
                billing_city,
                billing_state,
                billing_zip,
                billing_country
            )
            VALUES
            ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22 )
            RETURNING *
            `,
                [
                    session_id,
                    email,
                    shipping?.requested ?? false,
                    shipping?.address_line1 ?? null,
                    shipping?.address_line2 ?? null,
                    shipping?.city ?? null,
                    shipping?.state ?? null,
                    shipping?.zip ?? null,
                    shipping?.country ?? null,
                    totalAmount,
                    "PENDING",
                    squarePaymentIdempotencyKey,
                    squareOrderIdempotencyKey,
                    phone_number,
                    notes,
                    full_name,
                    billing.address_line1,
                    billing.address_line2 || null,
                    billing.city,
                    billing.state || null,
                    billing.zip,
                    billing.country,
                ]
            );

            localOrder = orderResult.rows[0];

            //
            // Snapshot every purchased item
            //
            for (const product of products) {

                const lineTotal = product.unitPrice * product.quantity;

                await client.query(
                    `
        INSERT INTO order_items
        (
            order_id,
            catalog_item_id,
            variation_id,
            product_name,
            unit_price,
            quantity,
            line_total,
            modifiers
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8
        )
        `,
                    [
                        localOrder.id,
                        product.product_id,
                        product.variation_id,
                        product.name,
                        product.unitPrice,
                        product.quantity,
                        lineTotal,
                        JSON.stringify(product.modifiers ?? {})
                    ]
                );
            }

            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        }

        //
        // ---------------------------------------------------------
        // STEP 2: Create Square Order
        // ---------------------------------------------------------
        //
        const orderResponse = await squareClient.orders.create({

            idempotencyKey: squareOrderIdempotencyKey,

            order: {
                locationId: squareEnv.locationId,
                lineItems,
                metadata: notes ? { customer_notes: notes } : undefined,
                fulfillments: [{
                    type: "SHIPMENT",
                    note: notes || undefined,
                    shipmentDetails: {
                        recipient: {
                            emailAddress: email,
                            phoneNumber:
                                phone_number || undefined,
                            displayName:
                                full_name || email,
                            address: recipientAddress
                        }
                    },
                }]
            }

        });

        const squareOrder = orderResponse.order;

        //
        // Save Square Order ID immediately.
        //
        await client.query(
            `
            UPDATE orders
            SET
                square_order_id = $1,
                updated_at = NOW()
            WHERE id = $2
            `,
            [
                squareOrder.id,
                localOrder.id
            ]
        );


        //
        // ---------------------------------------------------------
        // STEP 3: Charge Square
        // ---------------------------------------------------------
        //
        // VERY IMPORTANT:
        //
        // The idempotency key was generated BEFORE the Square call
        // and saved in our DB.
        //
        const paymentResponse = await squareClient.payments.create({

            sourceId,

            idempotencyKey: squarePaymentIdempotencyKey,

            orderId: squareOrder.id,

            amountMoney: squareOrder.totalMoney,

            receiptEmail: email,

            buyerEmailAddress: email,

            buyerPhoneNumber: phone_number,

            billingAddress: {
                addressLine1: billing.address_line1,
                addressLine2: billing.address_line2 || undefined,
                locality: billing.city,
                administrativeDistrictLevel1: billing.state || undefined,
                postalCode: billing.zip,
                country: billing.country
            }

        });

        payment = paymentResponse.payment;

        //
        // ---------------------------------------------------------
        // STEP 4: Payment succeeded.
        // Update DB.
        // ---------------------------------------------------------
        //
        await client.query("BEGIN");
        try {
            const finalOrderResult = await client.query(
                `
            UPDATE orders
            SET
                payment_status = $1,
                square_payment_id = $2,
                square_receipt_url = $3,
                updated_at = NOW()
            WHERE id = $4
            RETURNING *
            `,
                [
                    payment.status,
                    payment.id,
                    payment.receiptUrl || null,
                    localOrder.id
                ]
            );

            localOrder = finalOrderResult.rows[0];

            //
            // Empty cart
            //
            await client.query(
                `
            UPDATE carts
            SET
                cart_data = '{"products":[]}'::jsonb,
                updated_at = NOW()
            WHERE session_id = $1;  
            `,
                [session_id]
            );
            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        }


        res.status(200).json({
            success: true,
            orderId: localOrder.id,
            paymentId: payment.id,
            receiptUrl: payment.receiptUrl
        });

        // fire-and-forget emails
        void sendOrderConfirmation(localOrder, payment).catch(console.error);

        void sendAdminNotification(localOrder, payment).catch(console.error);

    } catch (err) {

        console.error("PAY ORDER ERROR:", err);
        console.error(err.stack);

        //
        // IMPORTANT:
        //
        // If Square already charged the customer, DO NOT tell
        // the frontend that the payment definitely failed.
        //
        if (payment?.id) {

            //
            // We know Square returned a payment.
            // The payment exists, so keep the local order
            // recoverable.
            //
            try {
                await client.query(
                    `
                    UPDATE orders
                    SET
                        payment_status = $1,
                        square_payment_id = $2,
                        square_receipt_url = $3,
                        updated_at = NOW()
                    WHERE id = $4
                    `,
                    [
                        payment.status || "COMPLETED",
                        payment.id,
                        payment.receiptUrl || null,
                        localOrder?.id
                    ]
                );
            } catch (dbError) {
                console.error(
                    "CRITICAL: Square payment succeeded but DB update failed:",
                    dbError
                );
            }

            return res.status(200).json({
                success: true,
                paymentReceived: true,
                orderId: localOrder?.id,
                paymentId: payment.id,
                message: "Payment received. Your order is being processed."
            });
        }

        //
        // If we created a local order but Square payment
        // never succeeded, mark it FAILED.
        //
        if (localOrder?.id) {

            try {
                await client.query(
                    `
                    UPDATE orders
                    SET
                        payment_status = 'FAILED',
                        updated_at = NOW()
                    WHERE id = $1
                    `,
                    [localOrder.id]
                );
            } catch (dbError) {
                console.error(
                    "Failed to mark local order as FAILED:",
                    dbError
                );
            }
        }

        //
        // At this point we don't have a successful Square
        // payment response.
        //
        return res.status(500).json({
            success: false,
            error:
                err?.message ||
                "Unable to process payment."
        });

    } finally {

        client.release();

    }
};



export default { getOrderById, getOrderItems, payOrder };