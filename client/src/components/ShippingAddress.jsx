export default function ShippingAddress({
    shipping,
    setShipping,
    shippingRequested,
    setShippingRequested,
    mailingSameAsBilling,
    setMailingSameAsBilling,
    billing,
    fieldClass,
    submitted
}) {
    const updateField = (field, value) => {
        setShipping((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSameAsBilling = (checked) => {
        setMailingSameAsBilling(checked);

        if (checked) {
            setShipping({
                ...billing,
                country: billing.country || "US"
            });
        }
    };

    if (!shippingRequested) {
        return (
            <label className="flex items-center gap-3 mt-6 text-[12px] md:text-[0.75vw] font-atkinson-regular tracking-widest">
                <input
                    type="checkbox"
                    checked={shippingRequested}
                    onChange={(e) =>
                        setShippingRequested(e.target.checked)
                    }
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
                        after:text-[12px]
                        after:font-bold
                        after:left-1/2
                        after:top-1/2
                        after:-translate-x-1/2
                        after:-translate-y-1/2
                        after:opacity-0
                        checked:after:opacity-100
                        font-atkinson-regular 
                        tracking-widest
                    "
                    style={{
                        boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)"
                    }}
                />

                Ship my prints/negatives
            </label>
        );
    }

    return (
        <div className="space-y-6 mt-6 font-atkinson-regular tracking-widest">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-[14px] md:text-[0.875vw] whitespace-nowrap">
                    Shipping Address
                </h2>

                <label className="flex items-center gap-3 text-[12px] md:text-[0.75vw] whitespace-nowrap">
                    <input
                        type="checkbox"
                        checked={mailingSameAsBilling}
                        onChange={(e) =>
                            handleSameAsBilling(e.target.checked)
                        }
                        className="
                            appearance-none
                            w-[24px] h-[23px]
                            md:w-[1.5vw] md:h-[3vh]
                            shrink-0
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
                            after:text-[12px]
                            after:font-bold
                            after:left-1/2
                            after:top-1/2
                            after:-translate-x-1/2
                            after:-translate-y-1/2
                            after:opacity-0
                            checked:after:opacity-100
                        "
                        style={{
                            boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)"
                        }}
                    />

                    Same as billing
                </label>

            </div>

            {/* Address line 1 */}
            <input
                placeholder="Address line 1"
                value={shipping.address_line1}
                disabled={mailingSameAsBilling}
                onChange={(e) =>
                    updateField("address_line1", e.target.value)
                }
                className={`${fieldClass(shipping.address_line1)} ${mailingSameAsBilling ? "opacity-60" : ""
                    }`}
                style={{
                    boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)"
                }}
            />

            {/* Address line 2 */}
            <input
                placeholder="Address line 2 (optional)"
                value={shipping.address_line2}
                disabled={mailingSameAsBilling}
                onChange={(e) => updateField("address_line2", e.target.value)}
                className={`w-[309px] md:w-full h-[35px] md:h-[4vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-widest text-[16px] md:text-[0.75vw] font-atkinson-regular text-[#9C9C9C] outline-none pl-2 border-gray-300 ${mailingSameAsBilling ? "opacity-60" : "" }`}
                style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
            />

            {/* City / State / ZIP */}
            <div className="flex justify-between">

                <input
                    type="text"
                    placeholder="City"
                    value={shipping.city}
                    disabled={mailingSameAsBilling}
                    onChange={(e) =>
                        updateField("city", e.target.value)
                    }
                    className={`${fieldClass(shipping.city)} !w-[110px] md:!w-[8vw] ${mailingSameAsBilling ? "opacity-60" : ""
                        }`}
                    style={{
                        boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)"
                    }}
                />

                <input
                    type="text"
                    placeholder="State"
                    value={shipping.state}
                    disabled={mailingSameAsBilling}
                    onChange={(e) =>
                        updateField("state", e.target.value)
                    }
                    className={`${fieldClass(shipping.state)} !w-[110px] md:!w-[8vw]  ${mailingSameAsBilling ? "opacity-60" : ""
                        }`}
                    style={{
                        boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)"
                    }}
                />

                <input
                    type="text"
                    placeholder="ZIP"
                    value={shipping.zip}
                    disabled={mailingSameAsBilling}
                    onChange={(e) =>
                        updateField("zip", e.target.value)
                    }
                    className={`${fieldClass(shipping.zip)} !w-[70px] md:!w-[5vw] ${mailingSameAsBilling ? "opacity-60" : ""
                        }`}
                    style={{
                        boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)"
                    }}
                />

            </div>
        </div>
    );
}