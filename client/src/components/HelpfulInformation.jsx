import { useState } from "react";
import AccordionItem from "./AccordionItem";
import infoIcon from '../assets/itemdetails/infoIcon.svg';

const HelpfulInformation = ({ page, product }) => {
    const [openAccordion, setOpenAccordion] = useState([]);

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

    return (
        <>
        {/* Desktop */}
        <div className="hidden md:block">
            {page === "product-details" ? (
                <>
                    <h1 className='font-atkinson-bold text-[0.833vw] text-[var(--color-orange)] flex relative gap-2 mt-10 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>

                    <h2 className='font-atkinson-bold text-[0.729vw] text-[var(--color-orange)] tracking-wider'>
                        Description
                    </h2>

                    <p className='font-atkinson-regular text-[0.625vw] tracking-wider'>
                        {product.description || "No description available for this product."}
                    </p>
                </>
            ) : (
                <>
                    <h1 className='font-atkinson-regular text-[0.833vw] text-[var(--color-orange)] flex relative gap-2 mt-10 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>
                </>
            )}


            <div className={`${page === "product-details" ? "mt-5" : "mt-2"}`}>
                <AccordionItem
                    index={0}
                    item={{
                        title: "Shipping Policy",
                        content: `Shipping to us: choose your carrier, a box or envelope with adequate packaging material, and send it to

        5R Photo Lab
        31 Washington Square West
        Suite 3R-C
        New York, NY 10011

Be sure to include a note and get a tracking number from your carrier. Visit ------------------ for detailed instructions and 
a printable order form.`
                    }}
                    isOpen={openAccordion.includes(0)}
                    onToggle={toggleAccordion}
                />

            </div>
            <div className="mt-5">
                <AccordionItem
                    index={1}
                    item={{ title: "Return Policy", content: "There is a $10 credit available for blank rolls, whether because they were not shot or due to camera issues. There are no refunds for film processing services. Any items shipped to you that are defective may be refunded and/or replaced at our expense." }}
                    isOpen={openAccordion.includes(1)}
                    onToggle={toggleAccordion}
                />
            </div>
        </div>


        {/* Mobile */}
        <div className="md:hidden">
            {page === "product-details" ? (
                <>
                    <h1 className='font-atkinson-bold text-[16px] text-[var(--color-orange)] flex relative gap-2 mt-10 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>

                    <h2 className='font-atkinson-bold text-[14px] text-[var(--color-orange)] tracking-wider'>
                        Description
                    </h2>

                    <p className='font-atkinson-regular text-[12px] tracking-wider'>
                        {product.description || "No description available for this product."}
                    </p>
                </>
            ) : (
                <>
                    <h1 className='font-atkinson-regular text-[16px] text-[var(--color-orange)] flex relative gap-2 mt-10 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>
                </>
            )}


            <div className={`${page === "product-details" ? "mt-5" : "mt-2"}`}>
                <AccordionItem
                    index={0}
                    item={{
                        title: "Shipping Policy",
                        content: `Shipping to us: choose your carrier, a box or envelope with adequate packaging material, and send it to

        5R Photo Lab
        31 Washington Square West
        Suite 3R-C
        New York, NY 10011

Be sure to include a note and get a tracking number from your carrier. Visit ------------------ for detailed instructions and 
a printable order form.`
                    }}
                    isOpen={openAccordion.includes(0)}
                    onToggle={toggleAccordion}
                />

            </div>
            <div className="mt-5">
                <AccordionItem
                    index={1}
                    item={{ title: "Return Policy", content: "There is a $10 credit available for blank rolls, whether because they were not shot or due to camera issues. There are no refunds for film processing services. Any items shipped to you that are defective may be refunded and/or replaced at our expense." }}
                    isOpen={openAccordion.includes(1)}
                    onToggle={toggleAccordion}
                />
            </div>
        </div>
        </>

    )
}

export default HelpfulInformation;