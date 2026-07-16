// pages/OrderConfirmationPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderConfirmationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { sessionId, refreshCart } = useCart();
    const dbOrderId = searchParams.get("dbOrderId");
    const [items, setItems] = useState([]);
    const [squareTotal, setSquareTotal] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!dbOrderId || !sessionId) return;

        let attempts = 0;
        const maxAttempts = 20; // poll for up to ~40 seconds

        const poll = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${dbOrderId}`, {
                    headers: { "x-session-id": sessionId }
                });

                if (!res.ok) {
                    setError("Order not found.");
                    return;
                }

                const data = await res.json();
                // console.log("Order data:", data);
                setOrder(data);

                if (data.payment_status === "COMPLETED") {
                    refreshCart();
                    // fetch line items
                    const itemsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${dbOrderId}/items`, {
                        headers: { "x-session-id": sessionId }
                    });
                    if (itemsRes.ok) {
                        const itemsData = await itemsRes.json();
                        // console.log("Order items data:", itemsData);
                        setItems(itemsData.items);
                        setSquareTotal(itemsData.squareTotal);
                    }
                    return;
                }

                if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(poll, 2000);
                }
            } catch (err) {
                setError("Something went wrong loading your order.");
            }
        };

        poll();
    }, [dbOrderId, sessionId]);

    if (error) return (
        <div className="p-4 mt-10 text-center pt-[25vh] pb-[25vh]">
            <p className="text-black">{error}</p>
            <button onClick={() => navigate('/')} className="mt-5 underline text-[var(--color-orange)] cursor-pointer">
                GO HOME
            </button>
        </div>
    );

    if (!order) return (
        <div className="p-4 mt-10 text-center tracking-wider font-atkinson-regular pb-[35vh]">
            <p>Loading your order...</p>
        </div>
    );

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block items-center justify-center max-w-[76vw] mx-auto pb-[35vh]">
                <div className="mt-5">
                    {order.payment_status === "COMPLETED" ? (
                        <h1 className="text-[1.641vw] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                            Order Confirmed!
                        </h1>
                    ) : (
                        <h1 className="text-[1.641vw] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                            Confirming your order...
                        </h1>
                    )}
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
                        <span className="text-[var(--color-orange)]">Email</span>
                        <span>{order.email || 'N/A'}</span>
                    </div>
                    {items.length > 0 && (
                        <div className="mb-2">
                            <p className="text-[var(--color-orange)] mb-2">Items ordered</p>
                            {items.map((item, i) => (
                                <div key={i} className="flex justify-between text-[0.7vw] font-atkinson-regular tracking-wider mb-1">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>${item.totalPrice}</span>
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
                    {order.payment_status === "COMPLETED" ? (
                        <h1 className="text-[31.5px] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                            Order Confirmed!
                        </h1>
                    ) : (
                        <h1 className="text-[31.5px] font-atkinson-bold text-[var(--color-orange)] tracking-wider text-center">
                            Confirming your order...
                        </h1>
                    )}
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
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>${item.totalPrice}</span>
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