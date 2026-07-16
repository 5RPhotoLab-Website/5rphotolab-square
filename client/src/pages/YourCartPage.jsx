import { useState } from "react";
import ItemCart from "../components/ItemCart.jsx";
import cashierTagIcon from '../assets/cart/cashierTagIcon.svg';
import HelpfulInformation from "../components/HelpfulInformation.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.08875;

const YourCartPage = () => {
    const navigate = useNavigate();
    const { cart, removeProduct, addProduct, sessionId } = useCart();
    const [shippingRequested, setShippingRequested] = useState(false);
    const [shipping, setShipping] = useState({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip: "",
        country: "US"
    });
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    const subtotal = cart.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0);
    const taxes = (subtotal * TAX_RATE).toFixed(2);
    const orderTotal = (subtotal + parseFloat(taxes)).toFixed(2);

    const fieldClass = (value, extra = "") =>
        `border-2 rounded-[10px] px-3 py-2 font-atkinson-regular tracking-wider outline-none ${extra} ${submitted && !value
            ? "border-red-400 focus:border-red-400"
            : "border-[#CECECE] focus:border-[var(--color-orange)]"
        }`;

    const handleCheckout = async () => {
        if (shippingRequested) {
            setSubmitted(true);
            if (!shipping.address_line1 || !shipping.city || !shipping.state || !shipping.zip) {
                return setError("Please fill out all required address fields");
            }
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId
                },
                body: JSON.stringify({
                    notes,
                    shipping: {
                        requested: shippingRequested,
                        ...(shippingRequested && shipping)
                    }
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            window.location.href = data.checkoutUrl;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const shouldScroll = cart.length > 2;

    return (
        <div className="bg-[#F5F5F5]">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center max-w-[76vw] mx-auto pb-[35vh]">
                {/* Header */}
                <div className="flex w-full items-center justify-center font-atkinson-bold tracking-wider mt-5">
                    {cart.length === 0 ? (
                        ""
                    ) : (
                        <h1 className="text-[1.641vw] text-[#211F22] ml-auto">Your Cart</h1>
                    )}
                    {totalItems > 0 && (
                        <p className="ml-auto text-[0.625vw] text-[var(--color-pink)]">
                            {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
                        </p>
                    )}
                </div>

                <div className="flex w-full">
                    <div className="w-[29.167vw] ml-30 pt-5">
                        <div className={`pr-5 ${shouldScroll ? "max-h-[50vh] overflow-y-auto" : ""}`}>
                            {cart.length === 0 ? (
                                <p className="mt-10 text-center font-atkinson-bold">
                                    Your cart is empty
                                </p>
                            ) : (
                                cart.map((product) => (
                                    <ItemCart
                                        key={product.product_id + JSON.stringify(product.modifiers)}
                                        product={product}
                                        removeProduct={removeProduct}
                                        addProduct={addProduct}
                                    />
                                ))
                            )}
                        </div>

                        <HelpfulInformation />
                    </div>

                    <div className="ml-auto max-w-[26.042vw]">
                        {/* Quick Actions */}
                        <div className="flex justify-between gap-10 mt-8">
                            <button
                                className='w-[9.844vw] h-[3.5vh] border-4 rounded-[10px] bg-[var(--color-green)] border-[var(--color-green)] tracking-wider text-[0.625vw] font-atkinson-regular cursor-pointer'
                                style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                                onClick={() => navigate('/mail-in')}
                            >
                                Add more items
                            </button>
                            <input
                                type="text"
                                placeholder="Any notes?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className='w-[9.844vw] h-[3.5vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-wider text-[0.625vw] font-atkinson-regular text-[#9C9C9C] tracking-wider outline-none pl-3'
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            />
                        </div>

                        {/* Shipping Address Toggle */}
                        {/* <button
                            className={`w-full h-[3.5vh] border-4 rounded-[10px] tracking-wider text-[0.625vw] font-atkinson-regular mt-7 cursor-pointer ${shippingRequested
                                ? "bg-[var(--color-green)] border-[var(--color-green)] text-black"
                                : "bg-[#F5F5F5] border-[#CECECE] text-[#9C9C9C]"
                                }`}
                            style={!shippingRequested ? { boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" } : { boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                            onClick={() => {
                                setShippingRequested(!shippingRequested);
                                setSubmitted(false);
                                setError(null);
                            }}
                        >
                            {shippingRequested ? "Please provide your address" : "Confirm your address for the prints and/or negatives"}
                        </button>

                        {shippingRequested && (
                            <div className="mt-4 flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Address line 1"
                                    value={shipping.address_line1}
                                    onChange={(e) => setShipping({ ...shipping, address_line1: e.target.value })}
                                    className={fieldClass(shipping.address_line1, "w-full text-[0.677vw]")}
                                />
                                <input
                                    type="text"
                                    placeholder="Address line 2 (optional)"
                                    value={shipping.address_line2}
                                    onChange={(e) => setShipping({ ...shipping, address_line2: e.target.value })}
                                    className="w-full border-2 border-[#CECECE] rounded-[10px] px-3 py-2 text-[0.677vw] font-atkinson-regular tracking-wider outline-none focus:border-[var(--color-orange)]"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={shipping.city}
                                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                        className={fieldClass(shipping.city, "flex-1 text-[0.677vw]")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={shipping.state}
                                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                        className={fieldClass(shipping.state, "w-[3.646vw] text-[0.677vw]")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ZIP"
                                        value={shipping.zip}
                                        onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                                        className={fieldClass(shipping.zip, "w-[4.688vw] text-[0.677vw]")}
                                    />
                                </div>
                                {error && <p className="text-red-500 text-[0.625vw] mt-4 tracking-wider">{error}</p>}
                            </div>
                        )} */}

                        {/* Summary */}
                        <div className="flex justify-between mt-14 tracking-wider font-atkinson-regular text-[0.729vw]">
                            <h1 className="text-[var(--color-pink)]">Subtotal</h1>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between tracking-wider font-atkinson-regular text-[0.729vw]">
                            <h1 className="text-[var(--color-pink)]">Estimated taxes (New York)</h1>
                            <p>${taxes}</p>
                        </div>
                        <div className="flex justify-between mt-5 tracking-wider font-atkinson-bold text-[0.729vw]">
                            <h1 className="text-[var(--color-pink)]">Estimated order total</h1>
                            <p>${orderTotal}</p>
                        </div>
                        <p className="text-[var(--color-pink)] text-[0.521vw] tracking-wider">
                            Additional taxes and fees will be calculated at checkout
                        </p>

                        {/* Checkout Actions */}
                        <div className="mt-14 flex justify-between mb-8">
                            <button
                                className='w-[12.76vw] h-[3.5vh] border-4 rounded-[10px] bg-[var(--color-blue)] tracking-wider text-[0.625vw] font-atkinson-regular disabled:opacity-50 cursor-pointer'
                                style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                                onClick={handleCheckout}
                                disabled={loading || cart.length === 0}
                            >
                                <span className='font-atkinson-bold text-white'>
                                    {loading ? "Redirecting..." : "Continue to payment"}
                                </span>
                            </button>
                            <button
                                className='w-[7.604vw] h-[3.5vh] border-4 rounded-[10px] bg-[#CECECE] tracking-wider text-[0.625vw] font-atkinson-regular cursor-pointer'
                                style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                                onClick={() => navigate('/mail-in')}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>








            {/* Mobile */}
            <div className="md:hidden p-4">
                {/* Header */}
                <div className="flex justify-between font-atkinson-bold items-center tracking-wider mt-5">
                    <h1 className="text-[31.5px] text-[#211F22]">Your Cart</h1>
                    {totalItems > 0 && (
                        <p className="text-[12px] text-[var(--color-pink)]">
                            {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
                        </p>
                    )}
                </div>

                {/* Cart Items */}
                {cart.length === 0 ? (
                    <p className="mt-10 text-center">Your cart is empty</p>
                ) : (
                    cart.map((product) => (
                        <ItemCart
                            key={product.product_id + JSON.stringify(product.modifiers)}
                            product={product}
                            removeProduct={removeProduct}
                            addProduct={addProduct}
                        />
                    ))
                )}

                {/* Quick Actions */}
                <div className="flex justify-between gap-10 mt-8">
                    <button
                        className='w-[189px] h-[35px] border-4 rounded-[10px] bg-[var(--color-green)] border-[var(--color-green)] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}
                    >
                        Add more items
                    </button>
                    <input
                        type="text"
                        placeholder="Any notes?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className='w-[195px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-wider text-[12px] font-atkinson-bold text-[#9C9C9C] tracking-wider outline-none pl-3'
                        style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                    />
                </div>

                {/* Shipping Address Toggle */}
                {/* <button
                    className={`w-full h-[35px] border-4 rounded-[10px] tracking-wider text-[12px] font-atkinson-regular mt-7 ${shippingRequested
                        ? "bg-[var(--color-green)] border-[var(--color-green)] text-black"
                        : "bg-[#F5F5F5] border-[#CECECE] text-[#9C9C9C]"
                        }`}
                    style={!shippingRequested ? { boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" } : { boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                    onClick={() => {
                        setShippingRequested(!shippingRequested);
                        setSubmitted(false);
                        setError(null);
                    }}
                >
                    {shippingRequested ? "Please provide your address" : "Confirm your address for the prints and/or negatives"}
                </button>

                {shippingRequested && (
                    <div className="mt-4 flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Address line 1"
                            value={shipping.address_line1}
                            onChange={(e) => setShipping({ ...shipping, address_line1: e.target.value })}
                            className={fieldClass(shipping.address_line1, "w-full text-[13px]")}
                        />
                        <input
                            type="text"
                            placeholder="Address line 2 (optional)"
                            value={shipping.address_line2}
                            onChange={(e) => setShipping({ ...shipping, address_line2: e.target.value })}
                            className="w-full border-2 border-[#CECECE] rounded-[10px] px-3 py-2 text-[13px] font-atkinson-regular tracking-wider outline-none focus:border-[var(--color-orange)]"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="City"
                                value={shipping.city}
                                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                className={fieldClass(shipping.city, "flex-1 text-[13px]")}
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={shipping.state}
                                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                className={fieldClass(shipping.state, "w-[70px] text-[13px]")}
                            />
                            <input
                                type="text"
                                placeholder="ZIP"
                                value={shipping.zip}
                                onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                                className={fieldClass(shipping.zip, "w-[80px] text-[13px]")}
                            />
                        </div>
                        {error && <p className="text-red-500 text-[12px] mt-4 tracking-wider">{error}</p>}
                    </div>
                )} */}

                {/* Summary */}
                <div className="flex justify-between mt-14 tracking-wider font-atkinson-regular text-[14px]">
                    <h1 className="text-[var(--color-pink)]">Subtotal</h1>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between tracking-wider font-atkinson-regular text-[14px]">
                    <h1 className="text-[var(--color-pink)]">Estimated taxes (New York)</h1>
                    <p>${taxes}</p>
                </div>
                <div className="flex justify-between mt-5 tracking-wider font-atkinson-bold text-[14px]">
                    <h1 className="text-[var(--color-pink)]">Estimated order total</h1>
                    <p>${orderTotal}</p>
                </div>
                <p className="text-[var(--color-pink)] text-[10px] tracking-wider">
                    Additional taxes and fees will be calculated at checkout
                </p>

                <HelpfulInformation />


                {/* Checkout Actions */}
                <div className="mt-4 flex justify-between mb-8">
                    <button
                        className='w-[245px] h-[35px] border-4 rounded-[10px] bg-[var(--color-blue)] tracking-wider text-[12px] font-atkinson-regular disabled:opacity-50'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={handleCheckout}
                        disabled={loading || cart.length === 0}
                    >
                        <span className='font-atkinson-bold text-white'>
                            {loading ? "Redirecting..." : "Continue to payment"}
                        </span>
                    </button>
                    <button
                        className='w-[146px] h-[35px] border-4 rounded-[10px] bg-[#CECECE] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}
                    >
                        Continue Shopping
                    </button>
                </div>

            </div>
        </div>
    );
};

export default YourCartPage;