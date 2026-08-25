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

                <p className="text-[var(--color-pink)] text-[12px] md:text-[0.75vw] font-atkinson-bold tracking-wider">
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
            
        </div>
    )
}

export default OrderSummaryAccordion;