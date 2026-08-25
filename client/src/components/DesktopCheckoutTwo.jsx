
import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import OrderSummaryAccordion from "./OrderSummaryAccordion";

import notesIcon from "../assets/checkout/notesIcon.svg";
import applePayIcon from "../assets/checkout/applePayIcon.svg";
import cashierTagIcon from '../assets/checkout/cashierTagIcon.svg';

const DesktopCheckoutTwo = ({ cart, checkoutTotal, estimatedTax, orderSummaryOpen, setOrderSummaryOpen, notes, setNotes, contact, billingData, shippingData, payment, discount, submitted, fieldClass }) => {
    const { fullName, setFullName, phoneNumber, setPhoneNumber, email, setEmail } = contact;

    const { billing, setBilling } = billingData;

    const { shipping, setShipping, shippingRequested, setShippingRequested, mailingSameAsBilling, setMailingSameAsBilling } = shippingData;

    const { cardRef, cardReady, applePayReady, loading, handlePay, handleApplePay } = payment;

    const { discountCode, setDiscountCode, discountAmount, appliedDiscount, setAppliedDiscount, discountLoading, discountError, setDiscountError, handleApplyDiscount, discountedTotal } = discount;

    return (
        <div className="hidden md:block max-w-[30vw] mx-auto flex flex-col justify-center pb-[6vh]">
            {/* Order Summary */}
            <OrderSummaryAccordion
                cart={cart}
                total={checkoutTotal}
                discountedTotal={discountedTotal}
                estimatedTax={estimatedTax}
                isOpen={orderSummaryOpen}
                onToggle={() =>
                    setOrderSummaryOpen((prev) => !prev)
                }
            />

            {/* Notes */}
            <div className="relative w-full mt-5">

                <img
                    src={notesIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    alt=""
                />

                <input
                    type="text"
                    placeholder="Say hi or whatever..."
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    className="w-full h-[4vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[0.833vw] font-atkinson-regular text-[#9C9C9C] outline-none pl-9"
                    style={{
                        boxShadow:
                            "0px 4px 0px rgba(206, 206, 206, 1)",
                    }}
                />

            </div>

            {/* Discount */}
            <div className="relative w-full mt-8">

                <img
                    src={cashierTagIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    alt=""
                />

                <input
                    type="text"
                    placeholder="Discount code or gift card"
                    value={discountCode}
                    onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setAppliedDiscount(null);
                        setDiscountError("");
                    }}
                    className="w-full h-[4vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[0.833vw] font-atkinson-regular text-[#9C9C9C] outline-none pl-9 pr-24"
                    style={{
                        boxShadow:
                            "0px 4px 0px rgba(206, 206, 206, 1)"
                    }}
                />

                <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={discountLoading || !!appliedDiscount}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.7vw] text-[#9C9C9C] font-atkinson-bold tracking-widest cursor-pointer"
                >
                    {discountLoading ? "Checking..." : appliedDiscount ? "Applied" : "Apply"}
                </button>

            </div>
            {discountError && (
                <div className="mt-2 text-red-500 text-[0.7vw] tracking-widest">
                    {discountError}
                </div>
            )}

            {appliedDiscount && (
                <div className="mt-2 text-[0.7vw] tracking-widest text-[var(--color-orange)]">
                    Discount applied
                </div>
            )}



            {/* Express Checkout */}
            <div className="flex items-center my-6">

                <div className="flex-1 border-[#CECECE] border-t" />

                <span className="mx-4 text-[#CECECE] text-[0.625vw] font-atkinson-regular tracking-widest whitespace-nowrap">
                    Express checkout
                </span>

                <div className="flex-1 border-[#CECECE] border-t" />

            </div>


            {/* Apple Pay */}
            {applePayReady && (
                <button
                    type="button"
                    onClick={handleApplePay}
                    disabled={loading}
                    className="w-full rounded-[10px] bg-[#211F22] text-white text-[1.25vw] font-atkinson-bold tracking-widest py-3 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
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

                <span className="mx-4 text-[#CECECE] text-[0.625vw] font-atkinson-regular tracking-widest">
                    Or
                </span>

                <div className="flex-1 border-[#CECECE] border-t" />

            </div>


            {/* Contact */}
            <div className="tracking-widest">

                <h3 className="font-atkinson-regular text-[0.875vw] mb-3">
                    Contact
                </h3>

                <div className="space-y-6">

                    <input
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                        className={fieldClass(fullName)}
                        style={{
                            boxShadow:
                                "0px 4px 0px rgba(206, 206, 206, 1)",
                        }}
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                        className={fieldClass(phoneNumber)}
                        style={{
                            boxShadow:
                                "0px 4px 0px rgba(206, 206, 206, 1)",
                        }}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className={fieldClass(email)}
                        style={{
                            boxShadow:
                                "0px 4px 0px rgba(206, 206, 206, 1)",
                        }}
                    />

                </div>

            </div>


            {/* Payment */}
            <div className="tracking-widest mt-8">

                <h3 className="font-atkinson-regular text-[0.875vw] mb-3">
                    Payment
                </h3>

                <div
                    ref={cardRef}
                    className="w-full"
                />

            </div>


            {/* Billing Address */}
            <BillingAddress
                billing={billing}
                setBilling={setBilling}
                fieldClass={fieldClass}
            />


            {/* Shipping */}
            <div className="mt-8">

                <label className="flex items-center gap-3 text-[0.75vw] font-atkinson-regular tracking-widest">

                    <input
                        type="checkbox"
                        checked={shippingRequested}
                        onChange={(e) =>
                            setShippingRequested(
                                e.target.checked
                            )
                        }
                        className="appearance-none w-[1.5vw] h-[3vh] border-2 border-black rounded-[6px] bg-[#F5F5F5] checked:bg-[var(--color-pink)] checked:border-black relative cursor-pointer after:content-['✓'] after:absolute after:text-black after:text-[16px] after:font-bold after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 checked:after:opacity-100"
                        style={{
                            boxShadow:
                                "0px 4px 0px rgba(0, 0, 0, 1)",
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
                        setMailingSameAsBilling={
                            setMailingSameAsBilling
                        }
                        billing={billing}
                        fieldClass={fieldClass}
                        submitted={submitted}
                    />
                )}

            </div>


            <div className="mt-15 space-y-2 text-[0.75vw] tracking-widest">
                {/* Original subtotal */}
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${discountedTotal.toFixed(2)}</span>
                </div>

                {/* Discount */}
                {discountAmount > 0 && (
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                )}

                {/* NY Tax */}
                {estimatedTax > 0 && (
                    <div className="flex justify-between">
                        <span>NY Sales Tax (8.875%)</span>
                        <span>${estimatedTax.toFixed(2)}</span>
                    </div>
                )}

                {/* Final total */}
                <div className="border-t border-[#CECECE] pt-2 flex justify-between font-atkinson-bold">
                    <span>Total</span>
                    <span>${checkoutTotal.toFixed(2)}</span>
                </div>
            </div>




            {/* Pay Button */}
            <button
                disabled={loading || !cardReady}
                onClick={handlePay}
                className="mt-14 mb-8 w-full rounded-xl bg-[var(--color-blue)] border-black border-4 text-white py-2 text-[1.25vw] font-atkinson-bold tracking-widest hover:bg-gray-800 transition cursor-pointer"
                style={{
                    boxShadow:
                        "0px 4px 0px rgba(0, 0, 0, 1)",
                }}
            >
                {loading
                    ? "Processing..."
                    : `Pay $${checkoutTotal.toFixed(2)}`}
            </button>



        </div>
    );
}

export default DesktopCheckoutTwo;