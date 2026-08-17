import { useRef, useState, useEffect } from "react";
import arrowUpGray from '../assets/checkout/arrowUpGray.svg';
import OrderSummaryItem from "./OrderSummaryItem";

const OrderSummaryAccordion = ({ cart, total, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        if (contentRef.current) {
            // Always measure the full scrollHeight, including padding
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, cart]);

    return (
        <div className="w-full mb-10">
            {/* Header */}
            <div className="flex justify-between">
                <button
                    onClick={onToggle}
                    className="flex gap-3 items-center cursor-pointer"
                >
                    <p className="font-atkinson-regular text-[14px] md:text-[0.833vw] tracking-widest">Order summary</p>
                    <img
                        src={arrowUpGray}
                        alt=""
                        className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
                    />
                </button>

                <p className="text-[var(--color-pink)] text-[12px] font-atkinson-bold tracking-wider">
                    ${total.toFixed(2)}
                </p>
            </div>

            {/* Accordion content */}
            <div
                style={{ height: `${height}px` }}
                className="overflow-hidden transition-[height] duration-300 ease-in-out"
            >
                <div ref={contentRef}>
                    <OrderSummaryItem cart={cart} />
                </div>
            </div>
            {/* <div
                style={{ height: `${height}px` }}
                className="overflow-hidden transition-[height] duration-300 ease-in-out"
            >
                <div ref={contentRef} className="pb-10">

                    {cart.map((product) => {
                        const lineTotal = (
                            product.unitPrice * product.quantity
                        ).toFixed(2);

                        const modifiers = product.modifiers || {};

                        const modifierEntries = Object.entries(modifiers).filter(
                            ([key, value]) =>
                                value !== undefined &&
                                value !== null &&
                                value !== "" &&
                                value !== "merch"
                        );

                        return (
                            <div
                                key={`${product.product_id}-${JSON.stringify(product.modifiers)}`}
                                className="mt-6"
                            >
                                <div className="flex justify-between">
                                    <p className="font-atkinson-bold text-[12px] tracking-wider">
                                        {product.name}
                                    </p>

                                    <p className="text-[var(--color-pink)] font-atkinson-bold text-[12px] tracking-wider">
                                        ${lineTotal}
                                    </p>
                                </div>

                                <div className="flex mt-3 space-x-5">

                                    <div className="relative shrink-0">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-[108px] h-[108px] object-cover"
                                        />

                                        <div
                                            style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                                            className="
                                            absolute
                                            -top-2
                                            -right-2
                                            min-w-[22px]
                                            h-[22px]
                                            px-1
                                            rounded-[6px]
                                            bg-[#EEEDED]
                                            text-black
                                            flex
                                            items-center
                                            justify-center
                                            font-atkinson-bold
                                            text-[12px]
                                            border-2
                                            border-black
                                        ">

                                            {product.quantity}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        {modifierEntries.map(([key, modifier]) => {
                                            const value =
                                                modifier?.name ?? modifier;

                                            const priceAdd = parseFloat(
                                                modifier?.priceAdd || 0
                                            );

                                            let title = key;

                                            if (
                                                key.trim().toLowerCase() ===
                                                "physical copies" ||
                                                key.trim().toLowerCase() ===
                                                "save my negatives"
                                            ) {
                                                title = `${key} - INVOICE LATER`;
                                            }

                                            return (
                                                <div
                                                    key={key}
                                                    className=""
                                                >
                                                    <h1 className="
                                                        font-atkinson-bold
                                                        text-[12px]
                                                        tracking-wider
                                                        text-[var(--color-pink)]
                                                        uppercase
                                                    ">
                                                        {title}
                                                    </h1>

                                                    <p className="
                                                        font-atkinson-regular
                                                        text-[12px]
                                                        tracking-wider
                                                    ">
                                                        {value}

                                                        {priceAdd > 0 &&
                                                            ` (+$${priceAdd.toFixed(2)})`
                                                        }
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div> */}


        </div>
    )
}

export default OrderSummaryAccordion;