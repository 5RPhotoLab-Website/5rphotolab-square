import { pool } from "../config/database.js";
import { squareClient, squareEnv } from "../config/square.js";
import { randomUUID } from "crypto";

// POST /orders/checkout
const createCheckout = async (req, res) => {
    try {
        const session_id = req.headers["x-session-id"];
        if (!session_id) return res.status(400).json({ error: "Missing session" });

        const { shipping, notes } = req.body;

        // Pull cart
        const cartResult = await pool.query(
            `SELECT * FROM carts WHERE session_id = $1 LIMIT 1`,
            [session_id]
        );
        if (cartResult.rows.length === 0 || cartResult.rows[0].cart_data.products.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const cart = cartResult.rows[0];
        const products = cart.cart_data.products;

        // const lineItems = products.map((p) => ({
        //     name: p.name,
        //     quantity: String(p.quantity),
        //     basePriceMoney: {
        //         amount: BigInt(Math.round(p.unitPrice * 100)),
        //         currency: "USD"
        //     }
        // }));
        const lineItems = products.map((p) => ({
            catalogObjectId: p.variation_id,
            quantity: String(p.quantity),
        }));

        const totalAmount = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);

        const orderResult = await pool.query(
            `INSERT INTO orders 
                (session_id, total_amount, payment_status,
                 shipping_requested, shipping_address_line1, shipping_address_line2,
                 shipping_city, shipping_state, shipping_zip, shipping_country, notes)
             VALUES ($1,$2,'PENDING',$3,$4,$5,$6,$7,$8,$9,$10)
             RETURNING *`,
            [
                session_id,
                totalAmount,
                shipping?.requested || false,
                shipping?.address_line1 || null,
                shipping?.address_line2 || null,
                shipping?.city || null,
                shipping?.state || null,
                shipping?.zip || null,
                shipping?.country || 'US',
                notes || null
            ]
        );

        const order = orderResult.rows[0];


        const response = await squareClient.checkout.paymentLinks.create({
            idempotencyKey: randomUUID(),
            order: {
                locationId: squareEnv.locationId,
                lineItems,
            },
            checkoutOptions: {
                redirectUrl: `${process.env.CLIENT_URL}/order/confirmation?orderId=${order.id}`,
                askForShippingAddress: false
            },
        });


        await pool.query(
            `UPDATE orders SET square_order_id = $1, updated_at = NOW() WHERE id = $2`,
            [response.paymentLink.orderId, order.id]
        );

        res.status(201).json({ checkoutUrl: response.paymentLink.url, orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// GET /orders/:orderId
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

// GET /orders/:orderId/items
const getOrderItems = async (req, res) => {
    try {
        const { orderId } = req.params;
        const session_id = req.headers["x-session-id"];

        // First get your DB order to verify session and get square_order_id
        const result = await pool.query(
            `SELECT * FROM orders WHERE id = $1 AND session_id = $2`,
            [orderId, session_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        const order = result.rows[0];
        if (!order.square_order_id) {
            return res.status(404).json({ error: "No Square order found" });
        }

        // Fetch from Square Orders API
        const response = await squareClient.orders.get({ orderId: order.square_order_id });

        const lineItems = response.order.lineItems || [];

        const items = lineItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.basePriceMoney ? (Number(item.basePriceMoney.amount) / 100).toFixed(2) : "0.00",
            totalPrice: item.totalMoney ? (Number(item.totalMoney.amount) / 100).toFixed(2) : "0.00"
        }));

        const squareTotal = response.order.totalMoney
            ? (Number(response.order.totalMoney.amount) / 100).toFixed(2)
            : null;

        res.status(200).json({ items, squareTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createCheckout, getOrderById, getOrderItems };