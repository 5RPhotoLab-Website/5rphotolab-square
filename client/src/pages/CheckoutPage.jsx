// src/pages/CheckoutPage.jsx
import { useEffect, useRef, useState } from "react";
import useSquare from "../hooks/useSquare";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BillingAddress from "../components/BillingAddress";
import ShippingAddress from "../components/ShippingAddress";
import cashierTagIcon from '../assets/checkout/cashierTagIcon.svg';
import notesIcon from '../assets/checkout/notesIcon.svg';
import applePayIcon from '../assets/checkout/applePayIcon.svg';
import OrderSummaryAccordion from "../components/OrderSummaryAccordion";


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
    const initializingRef = useRef(false);
    const paymentsRef = useRef(null);
    const applePayInstance = useRef(null);
    const paymentRequestRef = useRef(null);
    const [applePayReady, setApplePayReady] = useState(false);
    const [cardReady, setCardReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const [notes, setNotes] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [shippingRequested, setShippingRequested] = useState(false);
    const [mailingSameAsBilling, setMailingSameAsBilling] = useState(false);
    const [shipping, setShipping] = useState({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip: "",
        country: "US"
    });
    const [billing, setBilling] = useState({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(false);
    const toggleAccordion = (index) => {
        setOpenAccordion((prev) => {
            // if already open, remove it (close)
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            }
            // else add it (open)
            return [...prev, index];
        });
    };


    useEffect(() => {
        if (!loaded || cardInstance.current || initializingRef.current) {
            return;
        }

        initializingRef.current = true;

        async function init() {
            try {
                const payments = window.Square.payments(
                    appId,
                    locationId
                );

                paymentsRef.current = payments;

                // -------------------------
                // Apple Pay
                // -------------------------
                try {
                    const paymentRequest = payments.paymentRequest({
                        countryCode: "US",
                        currencyCode: "USD",
                        requestBillingContact: true,
                        requestShippingContact: true,
                        total: {
                            amount: total.toFixed(2),
                            label: "5R Photo Lab"
                        }
                    });

                    paymentRequestRef.current = paymentRequest;

                    const applePay =
                        await payments.applePay(paymentRequest);

                    applePayInstance.current = applePay;
                    setApplePayReady(true);

                } catch (applePayError) {
                    console.error(
                        "Apple Pay unavailable:",
                        applePayError
                    );

                    applePayInstance.current = null;
                    setApplePayReady(false);
                }

                // -------------------------
                // CARD — independent
                // -------------------------
                try {
                    const card = await payments.card({
                        style: {
                            ".input-container": {
                                borderColor: "#CECECE",
                                borderWidth: "4px",
                                borderRadius: "10px",
                            },

                            ".input-container.is-focus": {
                                borderColor: "#CECECE",
                                borderWidth: "4px",
                            },

                            ".input-container.is-error": {
                                borderColor: "#EF4444",
                                borderWidth: "4px",
                            },

                            input: {
                                backgroundColor: "#F5F5F5",
                                color: "#9C9C9C",
                                fontFamily: "inherit",
                                fontSize: "12px",
                            },

                            "input::placeholder": {
                                color: "#9C9C9C",
                            },

                            "input.is-focus": {
                                backgroundColor: "#F5F5F5",
                                color: "#9C9C9C",
                            },

                            ".message-text": {
                                color: "#9C9C9C",
                            },

                            ".message-text.is-error": {
                                color: "#EF4444",
                            },

                            ".message-icon": {
                                color: "#9C9C9C",
                            },

                            ".message-icon.is-error": {
                                color: "#EF4444",
                            },
                        },
                    });

                    await card.attach(cardRef.current);

                    cardInstance.current = card;
                    setCardReady(true);

                } catch (cardError) {
                    console.error(
                        "CARD INITIALIZATION FAILED:",
                        cardError
                    );

                    setCardReady(false);
                    setError(
                        `CARD ERROR: ${cardError?.name || "unknown"} - ${cardError?.message || "unknown error"
                        }`
                    );
                }

            } catch (err) {
                console.error(
                    "Square initialization failed:",
                    err
                );

                setError(
                    err?.message ||
                    "Unable to initialize payment form."
                );

            } finally {
                initializingRef.current = false;
            }
        }

        init();

    }, [loaded]);

    useEffect(() => {
        if (!paymentRequestRef.current || total <= 0) {
            return;
        }

        paymentRequestRef.current.update({
            total: {
                amount: total.toFixed(2),
                label: "5R Photo Lab"
            }
        });

        console.log("Apple Pay total updated:", total.toFixed(2));
    }, [total]);


    useEffect(() => {
        if (mailingSameAsBilling) {
            setShipping({
                ...billing,
                country: billing.country || "US"
            });
        }
    }, [billing, mailingSameAsBilling]);



    const handlePay = async () => {
        setLoading(true);
        setSubmitted(true);
        setError("");
        if (!fullName.trim()) {
            setError("Full name is required.");
            setLoading(false);
            return;
        }
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
        if (
            !billing.address_line1 ||
            !billing.city ||
            !billing.state ||
            !billing.zip ||
            !billing.country
        ) {
            setError("Please complete your billing address.");
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
                    full_name: fullName,
                    phone_number: phoneNumber,
                    email,
                    billing,
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
        setError("");

        try {
            if (!applePayInstance.current) {
                throw new Error("Apple Pay is unavailable.");
            }

            //
            // IMPORTANT:
            // tokenize() must happen immediately from the click handler.
            //
            const result = await applePayInstance.current.tokenize();

            if (result.status !== "OK") {
                throw new Error(
                    result.errors?.[0]?.message ??
                    "Apple Pay payment failed."
                );
            }

            const billingContact = result.details?.billing;
            const shippingContact = result.details?.shipping?.contact;

            if (!billingContact) {
                throw new Error(
                    "Apple Pay did not return billing information."
                );
            }

            //
            // Build our normal name/email/phone values
            //
            const fullName = [
                billingContact.givenName,
                billingContact.familyName
            ]
                .filter(Boolean)
                .join(" ");

            const email =
                billingContact.email ||
                shippingContact?.email ||
                "";

            const phoneNumber =
                billingContact.phone ||
                shippingContact?.phone ||
                "";

            if (!email) {
                throw new Error(
                    "Apple Pay did not provide an email address."
                );
            }

            //
            // Convert Square's Apple Pay billing contact
            // into YOUR database's billing format.
            //
            const billing = {
                address_line1:
                    billingContact.addressLines?.[0] || "",

                address_line2:
                    billingContact.addressLines?.[1] || "",

                city:
                    billingContact.city || "",

                state:
                    billingContact.state || "",

                zip:
                    billingContact.postalCode || "",

                country:
                    billingContact.countryCode || "US"
            };

            //
            // Shipping
            //
            let appleShipping = null;

            if (!shippingContact) {
                throw new Error(
                    "Apple Pay did not return a shipping address."
                );
            }
            appleShipping = {
                full_name: [
                    shippingContact.givenName,
                    shippingContact.familyName
                ]
                    .filter(Boolean)
                    .join(" "),
                address_line1:
                    shippingContact.addressLines?.[0] || "",
                address_line2:
                    shippingContact.addressLines?.[1] || "",
                city:
                    shippingContact.city || "",
                state:
                    shippingContact.state || "",
                zip:
                    shippingContact.postalCode || "",
                country:
                    shippingContact.countryCode || "US"
            };

            //
            // Send the EXACT SAME backend request
            // that card payments use.
            //
            const response = await fetch(
                `${API_BASE_URL}/api/orders/pay`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-session-id": sessionId
                    },

                    body: JSON.stringify({
                        sourceId: result.token,

                        full_name: fullName,
                        phone_number: phoneNumber,
                        email,

                        billing,

                        shipping: {
                            requested: true,
                            ...appleShipping
                        },

                        notes
                    })
                }
            );

            if (!response.ok) {
                const contentType =
                    response.headers.get("content-type");

                if (contentType?.includes("application/json")) {
                    const json = await response.json();

                    throw new Error(
                        json.error || "Apple Pay payment failed."
                    );
                }

                throw new Error(await response.text());
            }

            const json = await response.json();

            if (!json.success) {
                throw new Error(
                    json.error ||
                    "Unable to process your Apple Pay payment."
                );
            }

            navigate(
                `/order/confirmation?orderId=${json.orderId}`
            );

        } catch (error) {
            console.error("Apple Pay error:", error);

            setError(
                error?.message ||
                "Unable to process your Apple Pay payment."
            );
        } finally {
            setLoading(false);
        }
    };

    const fieldClass = (value) =>
        `w-[309px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] font-atkinson-regular text-[#9C9C9C] outline-none pl-2 ${submitted && !value
            ? "border-red-500"
            : "border-gray-300"
        }`;

    return (
        <>
            <div className="">
                {/* Desktop */}
                <div className="hidden md:block max-w-[900px] mx-auto pb-32">

                    <div className="grid grid-cols-2 gap-x-16">

                        {/* LEFT COLUMN */}
                        <div>

                            {/* Order Summary */}
                            <OrderSummaryAccordion
                                cart={cart}
                                total={total}
                                isOpen={orderSummaryOpen}
                                onToggle={() => setOrderSummaryOpen((prev) => !prev)}
                            />

                            {/* Express checkout */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-[#CECECE] border-t" />

                                <span className="mx-4 text-[#CECECE] text-[10px] font-atkinson-regular tracking-widest whitespace-nowrap">
                                    Express checkout
                                </span>

                                <div className="flex-1 border-[#CECECE] border-t" />
                            </div>

                            {applePayReady && (
                                <button
                                    type="button"
                                    onClick={handleApplePay}
                                    disabled={loading}
                                    className="
                        w-full
                        rounded-[10px]
                        bg-[#211F22]
                        text-white
                        text-[20px]
                        font-atkinson-bold
                        tracking-widest
                        py-3
                        flex
                        items-center
                        justify-center
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "
                                >
                                    {loading ? (
                                        "Finalizing your order..."
                                    ) : (
                                        <>
                                            Pay with
                                            <img
                                                src={applePayIcon}
                                                alt="Apple Pay"
                                                className="ml-4"
                                            />
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Or */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-[#CECECE] border-t" />

                                <span className="mx-4 text-[#CECECE] text-[10px] font-atkinson-regular tracking-widest">
                                    Or
                                </span>

                                <div className="flex-1 border-[#CECECE] border-t" />
                            </div>

                            {/* Contact */}
                            <div className="tracking-widest">

                                <h3 className="font-atkinson-regular text-[14px] mb-3">
                                    Contact
                                </h3>

                                <div className="space-y-6">

                                    <input
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className={fieldClass(fullName)}
                                        style={{
                                            boxShadow:
                                                "0px 4px 0px rgba(206, 206, 206, 1)"
                                        }}
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={fieldClass(phoneNumber)}
                                        style={{
                                            boxShadow:
                                                "0px 4px 0px rgba(206, 206, 206, 1)"
                                        }}
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={fieldClass(email)}
                                        style={{
                                            boxShadow:
                                                "0px 4px 0px rgba(206, 206, 206, 1)"
                                        }}
                                    />

                                </div>

                            </div>

                            {/* Payment */}
                            <div className="tracking-widest mt-8">

                                <h3 className="font-atkinson-regular text-[14px] mb-3">
                                    Payment
                                </h3>

                                <div
                                    ref={cardRef}
                                    className="w-full"
                                />

                            </div>

                        </div>


                        {/* RIGHT COLUMN */}
                        <div>

                            {/* Discount */}
                            {/* <div className="relative w-full">

                                <img
                                    src={cashierTagIcon}
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        w-4
                                        h-4
                                    "
                                    alt=""
                                />

                                <input
                                    type="text"
                                    placeholder="Discount code or gift card"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    className="
                                        w-full
                                        h-[35px]
                                        border-4
                                        rounded-[10px]
                                        bg-[#F5F5F5]
                                        border-[#CECECE]
                                        tracking-widest
                                        text-[12px]
                                        font-atkinson-regular
                                        text-[#9C9C9C]
                                        outline-none
                                        pl-9
                                    "
                                    style={{
                                        boxShadow:
                                            "0px 4px 0px rgba(206, 206, 206, 1)"
                                    }}
                                />
                            </div> */}


                            {/* Notes */}
                            <div className="relative w-full mt-5">

                                <img
                                    src={notesIcon}
                                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                    "
                                    alt=""
                                />

                                <input
                                    type="text"
                                    placeholder="Say hi or whatever..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="
                        w-full
                        h-[35px]
                        border-4
                        rounded-[10px]
                        bg-[#F5F5F5]
                        border-[#CECECE]
                        tracking-widest
                        text-[12px]
                        font-atkinson-regular
                        text-[#9C9C9C]
                        outline-none
                        pl-9
                    "
                                    style={{
                                        boxShadow:
                                            "0px 4px 0px rgba(206, 206, 206, 1)"
                                    }}
                                />

                            </div>


                            {/* Billing Address */}
                            <div className="">

                                <BillingAddress
                                    billing={billing}
                                    setBilling={setBilling}
                                    fieldClass={fieldClass}
                                />

                            </div>


                            {/* Shipping */}
                            <div className="mt-8">

                                <label className="flex items-center gap-3 text-[12px]">
                                    <input
                                        type="checkbox"
                                        checked={shippingRequested}
                                        onChange={(e) =>
                                            setShippingRequested(e.target.checked)
                                        }
                                        className="
                            appearance-none
                            w-[24px]
                            h-[23px]
                            border-2
                            border-black
                            rounded-[6px]
                            bg-[#F5F5F5]
                            checked:bg-[var(--color-pink)]
                            checked:border-black
                            relative
                            cursor-pointer
                            after:content-['✓']
                            after:absolute
                            after:text-black
                            after:text-[16px]
                            after:font-bold
                            after:left-1/2
                            after:top-1/2
                            after:-translate-x-1/2
                            after:-translate-y-1/2
                            after:opacity-0
                            checked:after:opacity-100
                        "
                                        style={{
                                            boxShadow:
                                                "0px 4px 0px rgba(0, 0, 0, 1)"
                                        }}
                                    />

                                    Ship my prints/negatives
                                </label>


                                {shippingRequested && (
                                    <ShippingAddress
                                        shipping={shipping}
                                        setShipping={setShipping}
                                        shippingRequested={shippingRequested}
                                        setShippingRequested={setShippingRequested}
                                        mailingSameAsBilling={mailingSameAsBilling}
                                        setMailingSameAsBilling={setMailingSameAsBilling}
                                        billing={billing}
                                        fieldClass={fieldClass}
                                        submitted={submitted}
                                    />
                                )}

                            </div>

                        </div>

                    </div>


                    {/* Pay button centered underneath both columns */}
                    <div className="max-w-[500px] mx-auto mt-10">

                        <button
                            disabled={loading || !cardReady}
                            onClick={handlePay}
                            className="
                w-full
                rounded-xl
                bg-[var(--color-blue)]
                border-black
                border-4
                text-white
                py-2
                text-[20px]
                font-atkinson-bold
                tracking-widest
                hover:bg-gray-800
                transition
            "
                            style={{
                                boxShadow:
                                    "0px 4px 0px rgba(0, 0, 0, 1)"
                            }}
                        >
                            {loading
                                ? "Processing..."
                                : `Pay $${total.toFixed(2)}`
                            }
                        </button>

                    </div>

                </div>

                {/* Mobile */}
                <div className="md:hidden p-4 flex flex-col justify-center">

                    <OrderSummaryAccordion
                        cart={cart}
                        total={total}
                        isOpen={orderSummaryOpen}
                        onToggle={() => setOrderSummaryOpen((prev) => !prev)}
                    />

                    {/* <div className="relative w-[309px] mx-auto">
                        <img
                            src={cashierTagIcon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                        <input
                            type="text"
                            placeholder="Discount code or gift card"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="w-[309px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] font-atkinson-regular text-[#9C9C9C] outline-none pl-9"
                            style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                        />
                    </div> */}
                    <div className="relative w-[309px] mt-5 mx-auto">
                        <img
                            src={notesIcon}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                        />
                        <input
                            type="text"
                            placeholder="Say hi or whatever..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-[309px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] font-atkinson-regular text-[#9C9C9C] outline-none pl-9"
                            style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                        />
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-[#CECECE] border-t" />

                        <span className="mx-4 text-[#CECECE] text-[10px] font-atkinson-regular tracking-widest">
                            Express checkout
                        </span>
                        <div className="flex-1 border-[#CECECE] border-t" />
                    </div>

                    {/* Apple Pay */}
                    {loading && (
                        <div className="mb-6 rounded-xl border p-5 text-center">
                            <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black" />

                            <p className="font-semibold">
                                Processing your payment...
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Please don't close this page.
                            </p>
                        </div>
                    )}
                    {applePayReady && (
                        <button
                            type="button"
                            onClick={handleApplePay}
                            disabled={loading}
                            className="mb-6 w-[309px] rounded-[10px] bg-[#211F22] text-white text-[20px] font-atkinson-bold tracking-widest py-3 hover:bg-gray-800 transition flex items-center justify-center mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Finalizing your order..." : (
                                <>
                                    Pay with
                                    <img src={applePayIcon} alt="Apple Pay" className="ml-4" />
                                </>
                            )}
                        </button>
                    )}

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-[#CECECE] border-t" />

                        <span className="mx-4 text-[#CECECE] text-[10px] font-atkinson-regular tracking-widest">
                            Or
                        </span>
                        <div className="flex-1 border-[#CECECE] border-t" />
                    </div>


                    <div className="w-[309px] mx-auto tracking-widest">
                        <h3 className="font-atkinson-regular text-[14px] mb-3">
                            Contact
                        </h3>
                        <div className="space-y-6">
                            <input
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={fieldClass(fullName)}
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            />
                            <input
                                type="phoneNumber"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={fieldClass(phoneNumber)}
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={fieldClass(email)}
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            />
                        </div>

                        <h3 className="font-atkinson-regular text-[14px] mb-3 mt-6">
                            Payment
                        </h3>

                        <div
                            ref={cardRef}
                            className="w-[309px]"
                        />

                        <BillingAddress
                            billing={billing}
                            setBilling={setBilling}
                            fieldClass={fieldClass}
                        />



                        <label className="flex items-center gap-3 mt-6 text-[12px]">
                            <input
                                type="checkbox"
                                checked={shippingRequested}
                                onChange={(e) => setShippingRequested(e.target.checked)}
                                className="
                                    appearance-none
                                    w-[24px] h-[23px]
                                    border-2 border-black
                                    rounded-[6px]
                                    bg-[#F5F5F5]
                                    checked:bg-[var(--color-pink)]
                                    checked:border-black
                                    relative
                                    cursor-pointer
                                    after:content-['✓']
                                    after:absolute
                                    after:text-black
                                    after:border-black
                                    after:text-[16px]
                                    after:font-bold
                                    after:left-1/2
                                    after:top-1/2
                                    after:-translate-x-1/2
                                    after:-translate-y-1/2
                                    after:opacity-0
                                    checked:after:opacity-100
                                "
                                style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                            />

                            Ship my prints/negatives
                        </label>


                        {shippingRequested && (
                            <ShippingAddress
                                shipping={shipping}
                                setShipping={setShipping}
                                shippingRequested={shippingRequested}
                                setShippingRequested={setShippingRequested}
                                mailingSameAsBilling={mailingSameAsBilling}
                                setMailingSameAsBilling={setMailingSameAsBilling}
                                billing={billing}
                                fieldClass={fieldClass}
                                submitted={submitted}
                            />
                        )}

                        <button
                            disabled={loading || !cardReady}
                            onClick={handlePay}
                            className="mt-6 mb-8 w-full rounded-xl bg-[var(--color-blue)] border-black border-4 text-white py-2 text-[20px] font-atkinson-bold tracking-widest hover:bg-gray-800 transition "
                            style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        >
                            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                        </button>
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