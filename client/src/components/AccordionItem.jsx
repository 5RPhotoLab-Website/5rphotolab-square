import { useRef, useState, useEffect } from "react";
import arrowDownOrange from '../assets/itemdetails/arrowDownOrange.svg';
import arrowUpOrange from '../assets/itemdetails/arrowUpOrange.svg';

const AccordionItem = ({ item, index, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        if (contentRef.current) {
            // Always measure the full scrollHeight, including padding
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div>
            <button
                onClick={() => onToggle(index)}
                className="flex gap-3 items-center cursor-pointer"
            >
                <p className="font-atkinson-regular text-[12px] md:text-[0.625vw] text-[var(--color-orange)] tracking-wider">{item.title}</p>
                <span className="text-medium">
                    {isOpen ? <img src={arrowUpOrange} alt="Arrow Up" /> : <img src={arrowDownOrange} alt="Arrow Down" />}
                </span>
            </button>

            <div
                ref={contentRef}
                style={{ maxHeight: `${height}px` }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
            >
                <div className="font-atkinson-regular text-[12px] md:text-[0.625vw] tracking-wider whitespace-pre-wrap">{item.content}</div>
            </div>
        </div>
    );
};

export default AccordionItem;
