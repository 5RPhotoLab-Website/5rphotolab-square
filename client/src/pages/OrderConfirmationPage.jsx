// pages/OrderConfirmationPage.jsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { OPTION_LABEL_DATA, TITLE_MAP } from "../config/productConfig";

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
                        setItems(itemsData.items);
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
                                    value: parseFloat(itemsData.squareTotal).toFixed(2),
                                    currency: "USD",
                                });
                            }

                            // Google
                            if (typeof window.gtag === "function") {
                                window.gtag("event", "purchase", {
                                    transaction_id: String(data.id),
                                    value: parseFloat(itemsData.squareTotal).toFixed(2),
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
        heading = "Order Confirmed!";
    }

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
                        <span className="text-[var(--color-orange)]">Order #</span>
                        <span>{order.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Status</span>
                        <span>{order.payment_status}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Phone Number</span>
                        <span>{order.phone_number || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Email</span>
                        <span>{order.email || 'N/A'}</span>
                    </div>
                    {items.length > 0 && (
                        <div className="mb-2">
                            <p className="text-[var(--color-orange)] mb-2">Items ordered</p>
                            {items.map((item, i) => (
                                <div key={i} className="text-[0.7vw] font-atkinson-regular tracking-wider mb-1">
                                    <div className="flex justify-between">
                                        <span>{item.product_name} × {item.quantity}</span>
                                        <span>${item.line_total}</span>
                                    </div>
                                    <div className="ml-4">
                                        <div className="flex flex-col mb-4">
                                            {Object.keys(TITLE_MAP)
                                                .filter(
                                                    key =>
                                                        item.modifiers?.[key] !== undefined &&
                                                        item.modifiers?.[key] !== null &&
                                                        key !== "type"
                                                )
                                                .map((key) => {
                                                    const selectedId = item.modifiers[key];

                                                    const optionData = OPTION_LABEL_DATA[key]?.find(
                                                        opt => opt.id === selectedId
                                                    );

                                                    let title = TITLE_MAP[key] || key;
                                                    title = title.replace(" FOR SHIPPING", "");

                                                    const isMerch = selectedId === "merch";

                                                    return (
                                                        <div key={key} className="mt-1 font-atkinson-bold tracking-wider">
                                                            <p className="text-[0.7vw] text-[var(--color-pink)] ">
                                                                {isMerch ? null : title}
                                                            </p>

                                                            <p className="text-[0.7vw] font-atkinson-regular tracking-wider">
                                                                {optionData
                                                                    ? `${optionData.label}${optionData.price > 0
                                                                        ? ` (+$${optionData.price.toFixed(2)})`
                                                                        : ""
                                                                    }`
                                                                    : selectedId}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between mt-6">
                        <span className="text-[var(--color-orange)]">Total</span>
                        <span>${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>



                    {order.shipping_requested && (
                        <div className="mt-4">
                            <p className="text-[var(--color-orange)] mb-1">Mailing address</p>
                            <p>{order.shipping_address_line1}</p>
                            {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
                            <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                        </div>
                    )}

                    {order.notes && (
                        <div className="mt-4">
                            <p className="text-[var(--color-orange)] mb-1">Notes</p>
                            <p>{order.notes}</p>
                        </div>
                    )}

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

                <div className="mt-10 mb-8 max-w-[40vw] mx-auto ">
                    <button
                        className='w-full py-2 border-4 rounded-[10px] bg-[var(--color-orange)] border-[var(--color-orange)] tracking-wider text-[0.75vw] font-atkinson-regular cursor-pointer'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>





            {/* Mobile */}
            <div className="md:hidden p-4">
                <div className="mt-5">
                    <h1 className="text-[1.641vw] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                        {heading}
                    </h1>
                </div>

                <div className="mt-8 font-atkinson-regular tracking-wider text-[14px]">
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Order #</span>
                        <span>{order.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Status</span>
                        <span>{order.payment_status}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-[var(--color-orange)]">Email</span>
                        <span>{order.email || 'N/A'}</span>
                    </div>
                    {items.length > 0 && (
                        <div className="mb-2">
                            <p className="text-[var(--color-orange)] mb-2">Items ordered</p>
                            {items.map((item, i) => (
                                <div key={i} className="flex justify-between text-[13px] font-atkinson-regular tracking-wider mb-1">
                                    <span>{item.product_name} × {item.quantity}</span>
                                    <span>${item.line_total}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between mt-6">
                        <span className="text-[var(--color-orange)]">Total</span>
                        <span>${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>



                    {order.shipping_requested && (
                        <div className="mt-4">
                            <p className="text-[var(--color-orange)] mb-1">Mailing address</p>
                            <p>{order.shipping_address_line1}</p>
                            {order.shipping_address_line2 && <p>{order.shipping_address_line2}</p>}
                            <p>{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                        </div>
                    )}

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

                <div className="mt-10 mb-8">
                    <button
                        className='w-full h-[35px] border-4 rounded-[10px] bg-[var(--color-orange)] border-[var(--color-orange)] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrderConfirmationPage;