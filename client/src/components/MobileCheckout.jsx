// src/components/MobileCheckout.jsx

import BillingAddress from "./BillingAddress";
import ShippingAddress from "./ShippingAddress";
import OrderSummaryAccordion from "./OrderSummaryAccordion";

import notesIcon from "../assets/checkout/notesIcon.svg";
import applePayIcon from "../assets/checkout/applePayIcon.svg";
import cashierTagIcon from '../assets/checkout/cashierTagIcon.svg';


const MobileCheckout = ({
    cart,
    total,

    orderSummaryOpen,
    setOrderSummaryOpen,

    notes,
    setNotes,

    discount,
    contact,
    billingData,
    shippingData,
    payment,

    submitted,
    fieldClass,
}) => {
    const {
        fullName,
        setFullName,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
    } = contact;

    const {
        billing,
        setBilling,
    } = billingData;

    const {
        shipping,
        setShipping,
        shippingRequested,
        setShippingRequested,
        mailingSameAsBilling,
        setMailingSameAsBilling,
    } = shippingData;

    const {
        cardRef,
        cardReady,
        applePayReady,
        loading,
        handlePay,
        handleApplePay,
    } = payment;

    const {
        discountCode,
        setDiscountCode,
        appliedDiscount,
        setAppliedDiscount,
        discountLoading,
        discountError,
        setDiscountError,
        handleApplyDiscount,
        discountedTotal
    } = discount;

    return (
        <div className="md:hidden p-4 flex flex-col justify-center">

            {/* Order Summary */}
            <OrderSummaryAccordion
                cart={cart}
                total={discountedTotal}
                isOpen={orderSummaryOpen}
                onToggle={() =>
                    setOrderSummaryOpen((prev) => !prev)
                }
            />


            {/* Notes */}
            <div className="relative w-[309px] mt-5 mx-auto">

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
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    className="
                        w-[309px]
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
                            "0px 4px 0px rgba(206, 206, 206, 1)",
                    }}
                />

            </div>

            {/* Discount */}
            <div className="relative w-[309px] mx-auto mt-5">
                <img
                    src={cashierTagIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
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
                    className="w-[309px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[12px] font-atkinson-regular text-[#9C9C9C] outline-none pl-9"
                    style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                />

                <button
                    type="button"
                    onClick={handleApplyDiscount}
                    disabled={discountLoading || !!appliedDiscount}
                    className="
                        absolute
                        right-2
                        top-1/2
                        -translate-y-1/2
                        text-[12px]
                        text-[#9C9C9C]
                        font-atkinson-bold
                        tracking-widest
                    "
                >
                    {discountLoading ? "Checking..." : appliedDiscount ? "Applied" : "Apply"}

                </button>
            </div>
            <div className="relative w-[309px] mx-auto">
                {discountError && (
                    <div className="mt-2 text-red-500 text-[12px] tracking-widest">
                        {discountError}
                    </div>
                )}

                {/* {appliedDiscount && (
                    <div className="mt-2 text-[12px] tracking-widest text-[var(--color-orange)]">
                        Discount applied: {appliedDiscount.code}
                    </div>
                )} */}
            </div>



            {/* Express Checkout */}
            <div className="flex items-center my-6">

                <div className="flex-1 border-[#CECECE] border-t" />

                <span className="mx-4 text-[#CECECE] text-[10px] font-atkinson-regular tracking-widest">
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
                    className="
                        mb-6
                        mt-6
                        w-[309px]
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
                        mx-auto
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


            <div className="w-[309px] mx-auto tracking-widest">

                {/* Contact */}
                <h3 className="font-atkinson-regular text-[14px] mb-3">
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


                {/* Payment */}
                <h3 className="font-atkinson-regular text-[14px] mb-3 mt-6">
                    Payment
                </h3>

                <div
                    ref={cardRef}
                    className="w-[309px]"
                />


                {/* Billing */}
                <BillingAddress
                    billing={billing}
                    setBilling={setBilling}
                    fieldClass={fieldClass}
                />


                {/* Shipping */}
                <label className="flex items-center gap-3 mt-6 text-[12px]">

                    <input
                        type="checkbox"
                        checked={shippingRequested}
                        onChange={(e) =>
                            setShippingRequested(
                                e.target.checked
                            )
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


                {/* Pay */}
                <button
                    disabled={loading || !cardReady}
                    onClick={handlePay}
                    className="
                        mt-6
                        mb-8
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
                            "0px 4px 0px rgba(0, 0, 0, 1)",
                    }}
                >
                    {loading
                        ? "Processing..."
                        : `Pay $${discountedTotal.toFixed(2)}`}
                </button>

            </div>

        </div>
    );
};

export default MobileCheckout;