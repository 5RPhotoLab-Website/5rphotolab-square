// controllers/webhookSquare.js
import { pool } from "../config/database.js";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// const emailHtml = `
// <!DOCTYPE html>
// <html lang="en-US">
// <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// </head>
// <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
//     <div style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0px 4px 0px rgba(33, 31, 34, 1); border: 2px solid #CECECE;">
        
//         <!-- Header -->
//         <div style="background-color: #ffffff; padding: 32px 32px 16px 32px; border-bottom: 2px solid #CECECE;">
//             <h1 style="margin: 0; font-size: 28px; color: var(--color-orange); letter-spacing: 0.1em;">Thank you for your mail-in order!</h1>
//             <p style="margin: 8px 0 0 0; font-size: 12px; color: #9C9C9C; letter-spacing: 0.1em;">ORDER CONFIRMED</p>
//         </div>

//         <!-- Body -->
//         <div style="padding: 32px;">
//             <p style="font-size: 14px; color: #211F22; letter-spacing: 0.05em; margin-top: 0;">
//                 We’re writing to confirm that you placed a mail-in order with us and share a few tidbits of info on what comes next.
//             </p>

//             <!-- Order Details -->
//             <div style="border: 2px solid #CECECE; border-radius: 10px; padding: 16px; margin: 24px 0; box-shadow: 0px 4px 0px rgba(206, 206, 206, 1);">
//                 <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                     <span style="font-size: 13px; color: #9C9C9C; letter-spacing: 0.05em;">Order #</span>
//                     <span style="font-size: 13px; color: #211F22; letter-spacing: 0.05em;">${order.id}</span>
//                 </div>
//                 <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//                     <span style="font-size: 13px; color: #9C9C9C; letter-spacing: 0.05em;">Email</span>
//                     <span style="font-size: 13px; color: #211F22; letter-spacing: 0.05em;">${order.email}</span>
//                 </div>
//                 <div style="display: flex; justify-content: space-between;">
//                     <span style="font-size: 13px; color: #9C9C9C; letter-spacing: 0.05em;">Total</span>
//                     <span style="font-size: 13px; color: #211F22; letter-spacing: 0.05em;">$${parseFloat(order.total_amount).toFixed(2)}</span>
//                 </div>
//             </div>

//             ${order.shipping_requested ? `
//             <!-- Shipping Address -->
//             <div style="border: 2px solid #CECECE; border-radius: 10px; padding: 16px; margin: 24px 0; box-shadow: 0px 4px 0px rgba(206, 206, 206, 1);">
//                 <p style="margin: 0 0 8px 0; font-size: 12px; color: #9C9C9C; letter-spacing: 0.1em;">MAILING ADDRESS</p>
//                 <p style="margin: 0; font-size: 13px; color: #211F22; letter-spacing: 0.05em; line-height: 1.6;">
//                     ${order.shipping_address_line1}<br>
//                     ${order.shipping_address_line2 ? order.shipping_address_line2 + '<br>' : ''}
//                     ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}
//                 </p>
//             </div>
//             ` : ''}

//             ${order.square_receipt_url ? `
//             <!-- Receipt Link -->
//             <a href="${order.square_receipt_url}" 
//                style="display: block; text-align: center; background-color: #211F22; color: #ffffff; text-decoration: none; padding: 10px; border-radius: 10px; font-size: 12px; letter-spacing: 0.1em; margin-top: 8px; border: 4px solid #211F22; box-shadow: 0px 4px 0px rgba(33, 31, 34, 0.3);">
//                 View Receipt
//             </a>
//             ` : ''}
//         </div>

//         <!-- Footer -->
//         <div style="padding: 16px 32px 32px 32px; border-top: 2px solid #CECECE;">
//             <p style="margin: 0; font-size: 11px; color: #9C9C9C; letter-spacing: 0.05em; text-align: center;">
//                 Questions? Reply to this email or reach us at hello@5rphotolab.com
//             </p>
//         </div>
//     </div>
// </body>
// </html>
// `;

export const handleSquareWebhook = async (req, res) => {
    console.log("=== WEBHOOK RECEIVED ===");
    // Verify the webhook is actually from Square
    const signature = req.headers["x-square-hmacsha256-signature"];
    const body = req.rawBody; // needs rawBody middleware (see routes below)
    const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    const url = `${process.env.SERVER_URL}/api/webhooks/square`;

    const hmac = crypto.createHmac("sha256", key);
    hmac.update(url + body);
    const expected = hmac.digest("base64");

    if (signature !== expected) {
        return res.status(403).json({ error: "Invalid signature" });
    }

    const event = JSON.parse(body);

    console.log(JSON.stringify(event, null, 2));

    if (event.type === "payment.updated") {
        const payment = event.data.object.payment;
        if (payment.status !== "COMPLETED") return res.status(200).json({ received: true });

        const squareOrderId = payment.order_id;
        const squarePaymentId = payment.id;
        const receiptUrl = payment.receipt_url;
        const email = payment.buyer_email_address || null; 

        // Find and update your order
        const result = await pool.query(
            `UPDATE orders
             SET square_payment_id = $1,
                 square_receipt_url = $2,
                 payment_status = 'COMPLETED',
                 email = $3,
                 updated_at = NOW()
             WHERE square_order_id = $4
             RETURNING *`,
            [squarePaymentId, receiptUrl, email, squareOrderId]
        );

        const order = result.rows[0];


        console.log("Expected URL:", url);
console.log("Signature:", signature);
console.log("Expected:", expected);

        if (order) {
            // Clear the cart
            await pool.query(
                `UPDATE carts SET cart_data = $1, updated_at = NOW() WHERE session_id = $2`,
                [{ products: [] }, order.session_id]
            );

            // Send confirmation email
            if (order.email) {
                await resend.emails.send({
                    from: "5R Photo Lab <info@5rphotolab.com>",
                    to: order.email,
                    subject: `Order #${order.id} Confirmed — 5R Photo Lab`,
                    html: `
                        <h2>Thanks for your order!</h2>
                        <p>Order #${order.id} has been received.</p>
                        <p>Total: $${order.total_amount}</p>
                        ${order.square_receipt_url ? `<p><a href="${order.square_receipt_url}">View receipt</a></p>` : ""}
                        ${order.shipping_requested ? `<p>We'll mail your prints/negatives to the address you provided.</p>` : ""}
                    `
                    // html: emailHtml
                });
            }
        }
    }

    res.status(200).json({ received: true });
};