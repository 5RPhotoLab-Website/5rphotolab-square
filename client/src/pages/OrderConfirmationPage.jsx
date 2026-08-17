// pages/OrderConfirmationPage.jsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { OPTION_LABEL_DATA, TITLE_MAP } from "../config/productConfig";
import OrderSummaryItem from "../components/OrderSummaryItem";

const OrderConfirmationPage = () => {
    const purchaseTracked = useRef(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { sessionId, refreshCart } = useCart();
    const orderId = searchParams.get("orderId");
    const [items, setItems] = useState([]);
    const [squareTotal, setSquareTotal] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderId || !sessionId) return;

        let attempts = 0;
        const maxAttempts = 30; // poll for up to ~60 seconds

        const poll = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`, {
                    headers: { "x-session-id": sessionId }
                });

                if (!res.ok) {
                    setError("Order not found.");
                    return;
                }

                const data = await res.json();
                setOrder(data);

                if (data.payment_status === "PAID" || data.payment_status === "COMPLETED") {
                    refreshCart();
                    // fetch line items
                    const itemsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/items`, {
                        headers: { "x-session-id": sessionId }
                    });
                    if (itemsRes.ok) {
                        const itemsData = await itemsRes.json();

                        const normalizedItems = itemsData.items.map((item) => ({
                            product_id: item.product_id ?? item.id,
                            name: item.product_name,
                            unitPrice: parseFloat(item.unit_price),
                            quantity: item.quantity,
                            imageUrl: item.image_url,
                            modifiers: item.modifiers || {},
                        }));

                        setItems(normalizedItems);
                        setSquareTotal(itemsData.squareTotal);

                        if (!purchaseTracked.current) {
                            purchaseTracked.current = true;

                            // Meta
                            if (typeof window.fbq === "function") {
                                window.fbq("track", "Purchase", {
                                    content_ids: itemsData.items.map(item =>
                                        String(item.id)
                                    ),
                                    content_type: "product",
                                    value: parseFloat(itemsData.squareTotal),
                                    currency: "USD",
                                });
                            }

                            // Google
                            if (typeof window.gtag === "function") {
                                window.gtag("event", "purchase", {
                                    transaction_id: String(data.id),
                                    value: parseFloat(itemsData.squareTotal),
                                    currency: "USD",
                                    items: itemsData.items.map(item => ({
                                        item_id: String(item.id),
                                        item_name: item.product_name,
                                        price: parseFloat(item.unit_price),
                                        quantity: item.quantity,
                                    })),
                                });
                            }
                        }
                    }
                    return;
                }

                attempts++;

                if (attempts < maxAttempts) {
                    setTimeout(poll, 2000);
                } else {
                    setError(
                        "Your payment is still processing. Please refresh this page in a minute."
                    );
                }
            } catch (err) {
                setError("Something went wrong loading your order.");
            }
        };

        poll();
    }, [orderId, sessionId]);

    if (error) return (
        <div className="p-4 mt-10 text-center pt-[25vh] pb-[30vh]">
            <p className="text-black">{error}</p>
            <button onClick={() => navigate('/')} className="mt-5 underline text-[var(--color-orange)] cursor-pointer">
                GO HOME
            </button>
        </div>
    );

    if (!order) return (
        <div className="p-4 mt-10 text-center tracking-wider font-atkinson-regular pt-[25vh] pb-[35vh]">
            <p>Loading your order...</p>
        </div>
    );

    let heading = "Confirming your order...";

    if (order.payment_status === "REFUNDED") {
        heading = "Your order has been refunded.";
    } else if (order.payment_status === "PENDING") {
        heading = "Your payment is still processing. Please refresh this page in a minute.";
    } else if (order.payment_status === "FAILED") {
        heading = "Your payment failed. Please try again.";
    } else if (order.payment_status === "CANCELED") {
        heading = "Your order has been canceled.";
    } else if (order.payment_status === "PAID" || order.payment_status === "COMPLETED") {
        heading = "Thank you for your order!";
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return `${date.getMonth() + 1}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}, ${date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })}`;
    };

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block items-center justify-center max-w-[76vw] mx-auto pb-[35vh]">
                <div className="mt-5">
                    <h1 className="text-[1.641vw] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                        {heading}
                    </h1>
                </div>

                <div className="mt-8 font-atkinson-regular tracking-wider text-[0.9vw] max-w-[40vw] mx-auto">
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Order number</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">#{order.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Order date</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Email</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{order.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Status</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{order.payment_status}</span>
                    </div>
                    <p className="text-left">Items Ordered</p>



                    <OrderSummaryItem cart={items} />



                    <div className="flex justify-between mt-6">
                        <span>Total</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>


                    {order.square_receipt_url && (
                        <a href={order.square_receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-6 text-center underline text-[var(--color-orange)] text-[0.7vw]"
                        >
                            View receipt
                        </a>
                    )}
                </div>

                <div className="inline-flex px-10 py-4 border-4 rounded-[10px] tracking-wider text-[0.781vw] font-atkinson-bold bg-[var(--color-green)] cursor-pointer"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>
                    HOW TO SHIP YOUR FILM
                </div>
            </div>





            {/* Mobile */}
            <div className="md:hidden p-4">
                <div className="mt-5">
                    <h1 className="text-[20px] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                        {heading}
                    </h1>
                </div>

                <div className="mt-8 font-atkinson-regular tracking-wider text-[14px]">
                    <div className="flex justify-between mb-2">
                        <span>Order number</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">#{order.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Order date</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Email</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{order.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Status</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">{order.payment_status}</span>
                    </div>
                    <p className="text-left">Items Ordered</p>


                    <OrderSummaryItem cart={items} />


                    <div className="flex justify-between mt-6">
                        <span>Total</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>

                    {order.square_receipt_url && (
                        <a href={order.square_receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-6 text-center underline text-[var(--color-orange)] text-[13px]"
                        >
                            View receipt
                        </a>
                    )}
                </div>

                <div className="inline-flex px-14.5 py-4 border-4 rounded-[10px] tracking-wider text-[20px] font-atkinson-bold mt-5 bg-[var(--color-green)] tracking-wider"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>HOW TO SHIP YOUR FILM</div>
            </div>
        </>
    );
};

export default OrderConfirmationPage;