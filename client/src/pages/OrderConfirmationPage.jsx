// pages/OrderConfirmationPage.jsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import OrderedConfirmationItems from "../components/OrderedConfirmationItems";

const OrderConfirmationPage = () => {
    const purchaseTracked = useRef(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { sessionId, refreshCart } = useCart();
    const orderId = searchParams.get("orderId");
    // const isTestMode = searchParams.get("test") === "true";
    const [items, setItems] = useState([]);
    const [squareTotal, setSquareTotal] = useState(null);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const testOrder = {
        id: 999999,
        payment_status: "COMPLETED",
        email: "test@example.com",
        phone_number: "555-555-5555",
        total_amount: "42.00",
        created_at: new Date().toISOString(),
        square_receipt_url: "http://localhost:5173/",
    };


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

                        setItems(itemsData.items || []);
                        setSquareTotal(itemsData.squareTotal);

                        const purchaseValue = Number(data.total_amount);

                        if (!purchaseTracked.current) {
                            purchaseTracked.current = true;

                            // Meta
                            if (typeof window.fbq === "function") {
                                window.fbq("track", "Purchase", {
                                    content_ids: itemsData.items.map(item =>
                                        String(item.id)
                                    ),
                                    content_type: "product",
                                    value: purchaseValue,
                                    currency: "USD",
                                });
                            }

                            // Google
                            if (typeof window.gtag === "function") {
                                window.gtag("event", "purchase", {
                                    transaction_id: String(data.id),
                                    value: purchaseValue,
                                    currency: "USD",
                                    items: itemsData.items.map(item => ({
                                        item_id: String(item.id),
                                        item_name: item.product_name,
                                        price: Number(item.unit_price),
                                        quantity: item.quantity,
                                    })),
                                });
                            }
                        }

                        //     if (!purchaseTracked.current) {
                        //     purchaseTracked.current = true;

                        //     // Meta
                        //     if (typeof window.fbq === "function") {
                        //         window.fbq("track", "Purchase", {
                        //             content_ids: itemsData.items.map(item =>
                        //                 String(item.id)
                        //             ),
                        //             content_type: "product",
                        //             value: parseFloat(itemsData.squareTotal),
                        //             currency: "USD",
                        //         });
                        //     }

                        //     // Google
                        //     if (typeof window.gtag === "function") {
                        //         window.gtag("event", "purchase", {
                        //             transaction_id: String(data.id),
                        //             value: parseFloat(itemsData.squareTotal),
                        //             currency: "USD",
                        //             items: itemsData.items.map(item => ({
                        //                 item_id: String(item.id),
                        //                 item_name: item.product_name,
                        //                 price: parseFloat(item.unit_price),
                        //                 quantity: item.quantity,
                        //             })),
                        //         });
                        //     }                       
                        // }

                        console.log("PURCHASE TRACKING", {
                            orderId: data.id,
                            orderTotal: data.total_amount,
                            squareTotal: itemsData.squareTotal,
                            trackingValue: Number(data.total_amount),
                        });
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

    // useEffect(() => {
    //     if (isTestMode) {
    //         setOrder({
    //             id: 999999,
    //             payment_status: "COMPLETED",
    //             email: "test@example.com",
    //             phone_number: "555-555-5555",
    //             total_amount: "42.00",
    //             created_at: new Date().toISOString(),
    //             square_receipt_url: "http://localhost:5173/",
    //         });

    //         setItems([
    //             {
    //                 id: 1,
    //                 product_name: "35mm Film Development",
    //                 unit_price: "12.00",
    //                 quantity: 2,
    //                 line_total: "24.00",
    //                 modifiers: {
    //                     "Film Type": {
    //                         name: "Color",
    //                         priceAdd: 0,
    //                     },
    //                     "Scan Resolution": {
    //                         name: "High Resolution",
    //                         priceAdd: 5,
    //                     },
    //                 },
    //             },
    //             {
    //                 id: 2,
    //                 product_name: "Physical Prints",
    //                 unit_price: "18.00",
    //                 quantity: 1,
    //                 line_total: "18.00",
    //                 modifiers: {
    //                     "Print Size": {
    //                         name: "4x6",
    //                         priceAdd: 0,
    //                     },
    //                 },
    //             },
    //         ]);

    //         setSquareTotal("42.00");

    //         return;
    //     }

    //     if (!orderId || !sessionId) return;

    //     let attempts = 0;
    //     const maxAttempts = 30;

    //     const poll = async () => {
    //         try {
    //             const res = await fetch(
    //                 `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`,
    //                 {
    //                     headers: {
    //                         "x-session-id": sessionId
    //                     }
    //                 }
    //             );

    //             if (!res.ok) {
    //                 setError("Order not found.");
    //                 return;
    //             }

    //             const data = await res.json();
    //             setOrder(data);

    //             if (
    //                 data.payment_status === "PAID" ||
    //                 data.payment_status === "COMPLETED"
    //             ) {
    //                 refreshCart();

    //                 const itemsRes = await fetch(
    //                     `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}/items`,
    //                     {
    //                         headers: {
    //                             "x-session-id": sessionId
    //                         }
    //                     }
    //                 );

    //                 if (itemsRes.ok) {
    //                     const itemsData = await itemsRes.json();

    //                     setItems(itemsData.items || []);
    //                     setSquareTotal(itemsData.squareTotal);

    //                     // Your tracking code here
    //                 }

    //                 return;
    //             }

    //             attempts++;

    //             if (attempts < maxAttempts) {
    //                 setTimeout(poll, 2000);
    //             } else {
    //                 setError(
    //                     "Your payment is still processing. Please refresh this page in a minute."
    //                 );
    //             }

    //         } catch (err) {
    //             setError("Something went wrong loading your order.");
    //         }
    //     };

    //     poll();
    // }, [orderId, sessionId, isTestMode]);

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
            <div className="hidden md:block items-center justify-center max-w-[76vw] mx-auto ">
                <div className="mt-10">
                    <h1 className="text-[1.641vw] font-atkinson-bold text-[var(--color-pink)] tracking-wider text-center">
                        {heading}
                    </h1>
                </div>

                <div className="mt-8 font-atkinson-regular tracking-wider text-[0.9vw] max-w-[40vw] mx-auto">
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


                    <p className="text-left mt-2">Items Ordered</p>
                    <OrderedConfirmationItems items={items} />



                    <div className="flex justify-between mt-6">
                        <span>Total</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>


                    {order.square_receipt_url && (
                        <a href={order.square_receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-6 text-center font-atkinson-bold underline text-[var(--color-pink)]"
                        >
                            View receipt
                        </a>
                    )}
                </div>

                <div className="flex justify-center mt-10 pb-[10vh]">
                    <div
                        className="inline-flex px-10 py-4 border-4 justify-center rounded-[10px] tracking-wider text-[0.781vw] font-atkinson-bold bg-[var(--color-green)] cursor-pointer"
                        style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/mail-in/how-to-mail-in")}
                    >
                        HOW TO SHIP YOUR FILM
                    </div>
                </div>
            </div>





            {/* Mobile */}
            <div className="md:hidden p-4">
                <div className="mt-5">
                    <h1 className="text-[20px] font-atkinson-bold text-[var(--color-pink)] tracking-wider text-center">
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


                    <p className="text-left mt-2">Items Ordered</p>
                    <OrderedConfirmationItems items={items} />


                    <div className="flex justify-between mt-6">
                        <span>Total</span>
                        <span className="text-[var(--color-pink)] font-atkinson-bold">${squareTotal || parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>

                    {order.square_receipt_url && (
                        <a href={order.square_receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-6 text-center underline font-atkinson-bold text-[var(--color-pink)] text-[13px] mb-6"
                        >
                            View receipt
                        </a>
                    )}
                </div>


                <div className="flex justify-center mt-8 mb-10">
                    <div
                        className="inline-flex px-10 py-4 border-4 rounded-[10px] tracking-wider text-[20px] font-atkinson-bold bg-[var(--color-green)] whitespace-nowrap"
                        style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/mail-in/how-to-mail-in")}
                    >
                        HOW TO SHIP YOUR FILM
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderConfirmationPage;