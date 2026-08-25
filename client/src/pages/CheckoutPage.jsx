// src/pages/CheckoutPage.jsx
import { useEffect, useRef, useState } from "react";
import useSquare from "../hooks/useSquare";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import DesktopCheckout from "../components/DesktopCheckout";
import DesktopCheckoutTwo from "../components/DesktopCheckoutTwo";
import MobileCheckout from "../components/MobileCheckout";


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
    const [isDesktop, setIsDesktop] = useState(
        window.innerWidth >= 768
    );
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
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [discountLoading, setDiscountLoading] = useState(false);
    const [discountError, setDiscountError] = useState("");
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
        country: "US"
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
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

    const discountAmount = appliedDiscount?.amountMoney?.amount
        ? appliedDiscount.amountMoney.amount / 100
        : appliedDiscount?.percentage
            ? total * (Number(appliedDiscount.percentage) / 100)
            : 0;

    const discountedTotal = Math.max(0, total - discountAmount);

    const taxAddress = shippingRequested
        ? shipping
        : billing;

    const isNY =
        taxAddress?.country === "US" &&
        taxAddress?.state?.trim().toUpperCase() === "NY";

    const estimatedTax = isNY
        ? discountedTotal * 0.08875
        : 0;

    const checkoutTotal = discountedTotal + estimatedTax;

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
                            amount: checkoutTotal.toFixed(2),
                            label: "5R Photo Lab"
                        }
                    });

                    paymentRequest.addEventListener(
                        "shippingcontactchanged",
                        (contact) => {
                            const isNY =
                                contact.countryCode === "US" &&
                                contact.state?.trim().toUpperCase() === "NY";

                            const tax = isNY
                                ? discountedTotal * 0.08875
                                : 0;

                            const newTotal = discountedTotal + tax;

                            return {
                                taxLineItems: [
                                    {
                                        label: "Sales Tax",
                                        amount: tax.toFixed(2)
                                    }
                                ],
                                total: {
                                    amount: newTotal.toFixed(2),
                                    label: "5R Photo Lab"
                                }
                            };
                        }
                    );

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
                amount: checkoutTotal.toFixed(2),
                label: "5R Photo Lab"
            }
        });
    }, [checkoutTotal, total]);


    useEffect(() => {
        if (mailingSameAsBilling) {
            setShipping({
                ...billing,
                country: billing.country || "US"
            });
        }
    }, [billing, mailingSameAsBilling]);


    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            setDiscountError("Enter a discount code.");
            return;
        }

        // Don't validate/apply again if this code is already applied
        if (
            appliedDiscount &&
            appliedDiscount.code === discountCode.trim().toUpperCase()
        ) {
            return;
        }

        setDiscountLoading(true);
        setDiscountError("");


        try {
            const response = await fetch(
                `${API_BASE_URL}/api/discounts/validate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: discountCode.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Invalid discount code."
                );
            }

            setAppliedDiscount(data.discount);

        } catch (error) {
            console.error("Discount validation error:", error);

            setAppliedDiscount(null);

            setDiscountError(
                error.message || "Unable to validate discount code."
            );

        } finally {
            setDiscountLoading(false);
        }
    };



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
                    notes,
                    discountCode: appliedDiscount?.code || null,
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

                        notes,
                        discountCode: appliedDiscount?.code || null,
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
        `w-[309px] md:w-full h-[35px] md:h-[4vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] md:text-[0.75vw] font-atkinson-regular text-[#9C9C9C] outline-none pl-2 ${submitted && !value
            ? "border-red-500"
            : "border-gray-300"
        }`;

    const contact = { fullName, setFullName, phoneNumber, setPhoneNumber, email, setEmail };
    const billingData = { billing, setBilling };
    const shippingData = { shipping, setShipping, shippingRequested, setShippingRequested, mailingSameAsBilling, setMailingSameAsBilling };
    const payment = { cardRef, cardReady, applePayReady, loading, handlePay, handleApplePay };
    const discount = { discountCode, setDiscountCode, discountAmount, appliedDiscount, setAppliedDiscount, discountLoading, discountError, setDiscountError, handleApplyDiscount, discountedTotal };
    const checkoutProps = { cart, checkoutTotal, estimatedTax, orderSummaryOpen, setOrderSummaryOpen, notes, setNotes, contact, billingData, shippingData, payment, discount, submitted, fieldClass };

    return (
        <>
            <div className="pt-5">
                {isDesktop ? (
                    <DesktopCheckoutTwo {...checkoutProps} />
                ) : (
                    <MobileCheckout {...checkoutProps} />
                )}
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-center">
                    {error}
                </div>
            )}
        </>
    );
}