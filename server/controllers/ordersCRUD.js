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

    try {
        await client.query("BEGIN");

        const session_id = req.headers["x-session-id"];
        const { sourceId, email, shipping, phone_number, notes } = req.body;
        if (!email?.trim()) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                error: "Email is required."
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
            await client.query("ROLLBACK");
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
        // Charge Square - before including the below code to create square order before charging
        //
        // const paymentResponse = await squareClient.payments.create({

        //     sourceId,

        //     idempotencyKey: randomUUID(),

        //     amountMoney: {
        //         amount: BigInt(Math.round(totalAmount * 100)),
        //         currency: "USD"
        //     }

        // });

        // const payment = paymentResponse.payment;

        //
        // Build Square line items
        //
        const lineItems = products.map(product => ({
            catalogObjectId: product.variation_id,
            quantity: String(product.quantity)
        }));

        //
        // Create Square Order
        //
        const recipient = {
            emailAddress: email,
            phoneNumber: phone_number || undefined,
            displayName: shipping?.name || email,
            address: {
                addressLine1: shipping?.address_line1 || undefined,
                addressLine2: shipping?.address_line2 || undefined,
                locality: shipping?.city || undefined,
                administrativeDistrictLevel1: shipping?.state || undefined,
                postalCode: shipping?.zip || undefined,
                country: shipping?.country || undefined,
            },
        };
        const orderResponse = await squareClient.orders.create({

            idempotencyKey: randomUUID(),

            order: {
                locationId: squareEnv.locationId,
                lineItems,
                fulfillments: [{
                    type: "SHIPMENT",
                    note: notes || undefined,
                    shipmentDetails: {
                        recipient,
                    },
                }]
            }

        });

        const squareOrder = orderResponse.order;

        //
        // Charge the Square Order
        //
        const paymentResponse = await squareClient.payments.create({

            sourceId,

            idempotencyKey: randomUUID(),

            orderId: squareOrder.id,

            amountMoney: squareOrder.totalMoney,

            receiptEmail: email,

        });

        const payment = paymentResponse.payment;

        //
        // Create order
        //
        const orderResult = await client.query(
            `
            INSERT INTO orders
            (
                session_id,
                email,
                shipping_requested,
                shipping_name,
                shipping_address_line1,
                shipping_address_line2,
                shipping_city,
                shipping_state,
                shipping_zip,
                shipping_country,
                total_amount,
                payment_status,
                square_order_id,
                square_payment_id,
                square_receipt_url,
                phone_number,
                notes
            )
            VALUES
            ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17 )
            RETURNING *
            `,
            [
                session_id,
                email,
                shipping?.requested ?? false,
                shipping?.name ?? null,
                shipping?.address_line1 ?? null,
                shipping?.address_line2 ?? null,
                shipping?.city ?? null,
                shipping?.state ?? null,
                shipping?.zip ?? null,
                shipping?.country ?? "US",
                totalAmount,
                payment.status,
                squareOrder.id,
                payment.id,
                payment.receiptUrl,
                phone_number,
                notes
            ]
        );

        const order = orderResult.rows[0];

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
                    order.id,
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

        res.status(200).json({
            success: true,
            orderId: order.id,
            paymentId: payment.id,
            receiptUrl: payment.receiptUrl
        });

        // fire-and-forget emails
        void sendOrderConfirmation(order, payment.receiptUrl).catch(console.error);

        void sendAdminNotification(order, payment.receiptUrl).catch(console.error);

    } catch (err) {

        await client.query("ROLLBACK");

        console.error(err);
        console.error(err.stack);

        res.status(500).json({
            success: false,
            error: err.message
        });

    } finally {

        client.release();

    }
};



export default { getOrderById, getOrderItems, payOrder };