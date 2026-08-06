// src/pages/CheckoutPage.jsx
import { useEffect, useRef, useState } from "react";
import useSquare from "../hooks/useSquare";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const appId = import.meta.env.VITE_SQUARE_PROD_APP_ID;
const locationId = import.meta.env.VITE_SQUARE_PROD_LOCATION_ID;

// const appId = import.meta.env.VITE_SQUARE_SANDBOX_APP_ID;
// const locationId = import.meta.env.VITE_SQUARE_SANDBOX_LOCATION_ID;
export default function CheckoutPage() {
    const { cart, sessionId } = useCart();
    const navigate = useNavigate();
    const loaded = useSquare();
    const cardRef = useRef(null);
    const cardInstance = useRef(null);
    const paymentsRef = useRef(null);
    const applePayInstance = useRef(null);
    const [cardReady, setCardReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const [notes, setNotes] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [shippingRequested, setShippingRequested] = useState(false);
    const [shipping, setShipping] = useState({
        name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip: "",
        country: "US"
    });
    const [submitted, setSubmitted] = useState(false);

    const fieldClass = (value) =>
        `border rounded-xl p-3 w-full ${submitted && !value
            ? "border-red-500"
            : "border-gray-300"
        }`;

    useEffect(() => {
        if (!loaded || cardInstance.current) return;

        async function init() {
            try {
                const payments = window.Square.payments(appId, locationId);
                paymentsRef.current = payments;

                //
                // Apple Pay
                //
                if (window.ApplePaySession) {
                    const paymentRequest = payments.paymentRequest({
                        countryCode: "US",
                        currencyCode: "USD",
                        total: {
                            amount: total.toFixed(2),
                            label: "5R Photo Lab"
                        }
                    });

                    const applePay = await payments.applePay(paymentRequest);

                    const supported = await applePay.canMakePayment();

                    if (supported) {
                        await applePay.attach("#apple-pay-button");
                        applePayInstance.current = applePay;
                    }
                }
                //
                // Card
                //
                const card = await payments.card();
                await card.attach(cardRef.current);

                cardInstance.current = card;

                setCardReady(true);

            } catch (err) {
                console.error("Failed to initialize Square", err);
                // setError("Unable to load payment form.");
                setError(
                    err?.message ||
                    JSON.stringify(err) ||
                    "Unable to load payment form."
                );
                alert(err?.message);
            }
        }

        init();
    }, [loaded, total]);


    const handlePay = async () => {
        setLoading(true);
        setSubmitted(true);
        setError("");
        if (!phoneNumber.trim()) {
            setError("Phone number is required.");
            setLoading(false);
            return;
        }
        if (!email.trim()) {
            setError("Email is required.");
            setLoading(false);
            return;
        }
        if (
            shippingRequested &&
            (
                !shipping.name ||
                !shipping.address_line1 ||
                !shipping.city ||
                !shipping.state ||
                !shipping.zip
            )
        ) {
            setError("Please complete your shipping address.");
            setLoading(false);
            return;
        }

        try {
            if (!cardInstance.current) {
                setError("Payment form isn't ready yet.");
                return;
            }
            const result = await cardInstance.current.tokenize();

            if (result.status !== "OK") {
                setError(
                    result.errors?.[0]?.message ??
                    "Please check your payment information."
                );
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/orders/pay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId
                },

                body: JSON.stringify({
                    sourceId: result.token,
                    phone_number: phoneNumber,
                    email,
                    shipping: {
                        requested: shippingRequested,
                        ...(shippingRequested ? shipping : {})
                    },
                    notes
                })
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType?.includes("application/json")) {
                    const json = await response.json();
                    throw new Error(json.error);
                }

                throw new Error(await response.text());
            }

            const json = await response.json();

            if (json.success) {
                navigate(`/order/confirmation?orderId=${json.orderId}`);
            } else {
                setError("Unable to process your payment. Please try again.");
                console.error("Payment error:", json.error);
            }
        } catch (error) {
            setError("Unable to process your payment. Please try again.");
            console.error("Payment error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplePay = async () => {
        setLoading(true);
        setSubmitted(true);
        setError("");

        try {
            if (!applePayInstance.current) {
                throw new Error("Apple Pay is unavailable.");
            }

            if (!phoneNumber.trim()) {
                throw new Error("Phone number is required.");
            }

            if (!email.trim()) {
                throw new Error("Email is required.");
            }

            if (
                shippingRequested &&
                (
                    !shipping.name ||
                    !shipping.address_line1 ||
                    !shipping.city ||
                    !shipping.state ||
                    !shipping.zip
                )
            ) {
                throw new Error("Please complete your shipping address.");
            }

            const result = await applePayInstance.current.tokenize();

            if (result.status !== "OK") {
                throw new Error(
                    result.errors?.[0]?.message ??
                    "Apple Pay failed."
                );
            }


            // verification for apple pay?
            const payments = window.Square.payments(appId, locationId);

            const verification = await payments.verifyBuyer(
                result.token,
                {
                    amount: total.toFixed(2),
                    currencyCode: "USD",
                    intent: "CHARGE",
                    billingContact: {
                        givenName: shipping.name?.split(" ")[0] || "",
                        familyName: shipping.name?.split(" ").slice(1).join(" ") || "",
                        email,
                        phone: phoneNumber,
                        countryCode: "US"
                    }
                }
            );

            const response = await fetch(`${API_BASE_URL}/api/orders/pay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId
                },
                body: JSON.stringify({
                    sourceId: result.token,
                    phone_number: phoneNumber,
                    email,
                    shipping: {
                        requested: shippingRequested,
                        ...(shippingRequested ? shipping : {})
                    },
                    notes
                })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            navigate(`/order/confirmation?orderId=${json.orderId}`);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-stone-50 min-h-screen py-16">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Secure Checkout
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Your payment is processed securely by Square.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* Order Summary */}

                        <div className="bg-white rounded-2xl shadow-sm border p-8">

                            <h2 className="text-xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            {/* later map over cart items */}

                            <div className="space-y-4">

                                {cart.map((item) => (
                                    <div
                                        key={item.variation_id}
                                        className="flex justify-between"
                                    >
                                        <div>
                                            <p>{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Qty {item.quantity}
                                            </p>
                                        </div>

                                        <span>
                                            ${(item.unitPrice * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            <div className="border-t mt-8 pt-6 flex justify-between text-xl font-bold">

                                <span>Total</span>

                                <span>${total.toFixed(2)}</span>

                            </div>
                            <input
                                type="text"
                                placeholder="Any notes?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className='w-[9.844vw] h-[3.5vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-wider text-[0.625vw] font-atkinson-regular text-[#9C9C9C] tracking-wider outline-none pl-3'
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            />
                        </div>

                        {/* Payment */}

                        <div className="bg-white rounded-2xl shadow-sm border p-8">

                            <h2 className="text-xl font-semibold mb-6">
                                Payment
                            </h2>

                            {/* Apple Pay goes here later */}
                            <button
                                onClick={handleApplePay}
                                className="mb-6 w-full rounded-xl bg-black text-white py-4 text-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-3"
                            >
                                Apple Pay
                            </button>

                            {/* Google Pay */}

                            {/* Divider */}
                            <h3 className="font-semibold mb-3">
                                Contact
                            </h3>
                            <input
                                type="phoneNumber"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={fieldClass(phoneNumber)}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={fieldClass(email)}
                            />
                            <label className="flex items-center gap-3 mt-6">
                                <input
                                    type="checkbox"
                                    checked={shippingRequested}
                                    onChange={(e) =>
                                        setShippingRequested(e.target.checked)
                                    }
                                />

                                Ship my prints/negatives
                            </label>
                            {shippingRequested && (
                                <div className="space-y-3 mt-4">
                                    <input
                                        placeholder="Full Name"
                                        value={shipping.name}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                name: e.target.value
                                            })
                                        }
                                        className={fieldClass(shipping.name)}
                                    />

                                    <input
                                        placeholder="Address line 1"
                                        value={shipping.address_line1}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                address_line1: e.target.value
                                            })
                                        }
                                        className={fieldClass(shipping.address_line1)}
                                    />

                                    <input
                                        placeholder="Address line 2"
                                        value={shipping.address_line2}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                address_line2: e.target.value
                                            })
                                        }
                                        className="border rounded-xl p-3 w-full"
                                    />

                                    <div className="grid grid-cols-3 gap-3">

                                        <input
                                            placeholder="City"
                                            value={shipping.city}
                                            onChange={(e) =>
                                                setShipping({
                                                    ...shipping,
                                                    city: e.target.value
                                                })
                                            }
                                            className={fieldClass(shipping.city)}
                                        />

                                        <input
                                            placeholder="State"
                                            value={shipping.state}
                                            onChange={(e) =>
                                                setShipping({
                                                    ...shipping,
                                                    state: e.target.value
                                                })
                                            }
                                            className={fieldClass(shipping.state)}
                                        />

                                        <input
                                            placeholder="ZIP"
                                            value={shipping.zip}
                                            onChange={(e) =>
                                                setShipping({
                                                    ...shipping,
                                                    zip: e.target.value
                                                })
                                            }
                                            className={fieldClass(shipping.zip)}
                                        />

                                    </div>

                                </div>
                            )}

                            <div className="flex items-center my-6">


                                <div className="flex-1 border-t" />

                                <span className="mx-4 text-gray-400 text-sm">
                                    Card
                                </span>

                                <div className="flex-1 border-t" />

                            </div>

                            <div
                                ref={cardRef}
                                className="border rounded-xl p-4 bg-white"
                                style={{ minHeight: "180px" }}
                            />

                            <div className="mt-6 flex items-center text-sm text-gray-500">

                                🔒 Secure payment powered by Square

                            </div>

                            <button
                                disabled={loading || !cardReady}
                                onClick={handlePay}
                                className="mt-8 w-full rounded-xl bg-black text-white py-4 text-lg font-semibold hover:bg-gray-800 transition "
                            >
                                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                            </button>

                        </div>

                    </div>

                </div>
            </div>
            <>
                {error && (
                    <div className="mt-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
            </>
        </>
    );
}