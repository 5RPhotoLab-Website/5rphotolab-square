import { useState } from "react";
import ItemCart from "../components/ItemCart.jsx";
import HelpfulInformation from "../components/HelpfulInformation.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.08875;

const YourCartPage = () => {
    const navigate = useNavigate();
    const { cart, removeProduct, addProduct, sessionId } = useCart();
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    const orderTotal = cart.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);
        navigate("/checkout");
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
                            {/* <input
                                type="text"
                                placeholder="Any notes?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className='w-[9.844vw] h-[3.5vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-wider text-[0.625vw] font-atkinson-regular text-[#9C9C9C] tracking-wider outline-none pl-3'
                                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                            /> */}
                        </div>

                        <div className="flex justify-between mt-10 tracking-wider font-atkinson-bold text-[0.729vw]">
                            <h1 className="text-[var(--color-pink)]">Estimated order total</h1>
                            <p>${orderTotal.toFixed(2)}</p>
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
                <div className="flex justify-center gap-10 mt-8">
                    <button
                        className='w-[189px] h-[35px] border-4 rounded-[10px] bg-[var(--color-green)] border-[var(--color-green)] tracking-wider text-[12px] font-atkinson-regular'
                        style={{ boxShadow: "0px 4px 0px rgba(33, 31, 34, 1)" }}
                        onClick={() => navigate('/mail-in')}
                    >
                        Add more items
                    </button>
                </div>

                <div className="flex justify-between mt-10 tracking-wider font-atkinson-bold text-[14px]">
                    <h1 className="text-[var(--color-pink)]">Estimated order total</h1>
                    <p>${orderTotal.toFixed(2)}</p>
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