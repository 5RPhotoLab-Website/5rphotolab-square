import { pool } from "../config/database.js";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailHtml = `
<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, sans-serif;">
    <div>
        <!-- Body -->
        <div>
            <p style="font-size: 14px; color: #000000;">
                Greetings!
            </p>
            <p style="font-size: 14px; color: #000000;">
                We’re writing to confirm that you placed a mail-in order with us and share a few tidbits of info on what comes next.
            </p>
            <p style="font-size: 14px; color: #000000;">
                1. Ship your film to us
            </p>
            <p style="font-size: 14px; color: #000000;">
            Please download, print, and fill out our ORDER FORM. (If you prefer, write your name on a piece of paper with your order number.) Put the form and your film in a zip-loc bag, then put the bag in a padded mailer or a box with ample packing material. Address your shipment to:
            </p>
            <p style="font-size: 14px; color: #000000;">
                5R Photo Lab<br>
                31 Washington Square West<br>
                Suite 3R-C<br>
                New York, NY 10011
            </p>
            <p style="font-size: 14px; color: #000000;">
                You can use any carrier you like, but please choose a service that provides a tracking number—it’s worth the peace of mind. Most of your fellow mail-in customers choose USPS Ground Advantage, but that’s not always the best fit for everyone. For our own shipping, we use Pirate Ship, which makes it easy to compare different options and offers discounts. 
            </p>
            <p style="font-size: 14px; color: #000000;">
                Pro tip for dispo users: you can remove the film from your camera, which reduces the weight, bulk, and sometimes the cost of your shipment. Just ask us how! </p>
            <p style="font-size: 14px; color: #000000;">
                2. Once your shipment reaches us, we get straight to work! C-41 (color and Ilford XP2) film is typically processed the day or the day after we receive it, scanned, and sent to you the following day. Black and white film takes a little longer—normally about five days after we receive it. </p>
            <p style="font-size: 14px; color: #000000;">
                3. Look out for an email from WeTransfer! You’ll see a link to download your scans—the link lasts a year from the date we send it to you. WeTransfer offers a mobile app, but we recommend using a desktop browser. It’s also nice to have your photos in a more permanent place than your phone! </p>
            <p style="font-size: 14px; color: #000000;">
                4. If you ordered prints or requested negatives, we’ll box them up and send you an invoice for the cost of shipping only. Please confirm your address once you receive the scans. Once you pay the invoice, we take your shipment to the post office. We normally ship your prints and negatives within a week of sending your scans. </p>
            <p style="font-size: 14px; color: #000000;">
                5. If your roll is blank, you’ll receive a $10 credit towards your next order. 5R Photo Lab does not offer refunds. </p>
            <p style="font-size: 14px; color: #000000;">
                6. Call or text us at (646) 319-4106 or email  <a href="mailto:info@5rphotolab.com">info@5rphotolab.com</a> if we can be of any assistance, or just to tell us how much you love your scans and prints :)
            </p>
            <p style="font-size: 14px; color: #000000;">
                Can’t wait to meet your film! </p>
            <p style="font-size: 14px; color: #000000;">
                -5R
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: left;">
            <p style="font-size: 12px; text-align: left;">
                --
            </p>
            <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4zQR9e8Y82YsnsSkbGVSliaE9knLsIO_DyNDC4BlBhLx4MYb5enJ8uHE0ieuWPqXSJpNrK-IKw6CZzs" alt="5R Photo Lab Logo" style="display: block; width: 100px; height: auto;">
            <a href="https://www.5rphotolab.com" style="font-size: 12px;">www.5rphotolab.com</a><br/>
            <a href="https://5rphotolab.square.site/" style="font-size: 12px;">Place Your Mail-In Order</a>
        </div>
    </div>
</body>
</html>
`;

export async function sendOrderConfirmation(order) {
    if (!order.email) return;

    await resend.emails.send({
        from: "5R Photo Lab <info@5rphotolab.com>",
        to: order.email,
        subject: "Thank you for your mail-in order!",
        html: emailHtml,
    });
}

export async function sendAdminNotification({
    order,
    items,
    payment,
    receiptUrl
}) {

    const itemsHtml = items.map(item => `
        <tr>
            <td>${item.quantity}×</td>
            <td>${item.product_name}</td>
            <td style="text-align:right">
                $${Number(item.line_total).toFixed(2)}
            </td>
        </tr>
    `).join("");

    await resend.emails.send({
        from: "5R Photo Lab <info@5rphotolab.com>",
        to: "info@5rphotolab.com",
        subject: `New Order #${order.id}`,

        html: `
<h2>New Order #${order.id}</h2>

<h3>Customer</h3>

<p>
<b>Name:</b> ${order.shipping_name || "Not provided"}<br>
<b>Email:</b> ${order.email}<br>
<b>Total:</b> $${Number(order.total_amount).toFixed(2)}<br>
<b>Payment:</b> ${payment.status}<br>
</p>

<h3>Items</h3>

<table cellpadding="6" cellspacing="0" border="1">
<tr>
<th>Qty</th>
<th>Item</th>
<th>Total</th>
</tr>

${itemsHtml}

</table>

<h3>Shipping</h3>

<p>
${order.shipping_name || ""}<br>
${order.shipping_address_line1 || ""}<br>
${order.shipping_address_line2 || ""}<br>
${order.shipping_city || ""}, ${order.shipping_state || ""} ${order.shipping_zip || ""}<br>
${order.shipping_country || ""}
</p>

<p>
<b>Receipt:</b><br>
<a href="${receiptUrl}">
${receiptUrl}
</a>
</p>

<p>
<b>Square Order:</b> ${order.square_order_id}<br>
<b>Square Payment:</b> ${order.square_payment_id}
</p>

${order.notes
                ? `<p><b>Notes:</b><br>${order.notes}</p>`
                : ""
            }
`
    });
}