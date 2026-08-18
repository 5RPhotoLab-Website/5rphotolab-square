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
                        <h1 className='font-atkinson-bold text-[0.833vw] text-[var(--color-orange)] flex relative gap-2 mt-30 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>
                    </>
                )}


                <div className={`${page === "product-details" ? "mt-5" : "mt-2"}`}>
                    <AccordionItem
                        index={0}
                        item={{
                            title: "Shipping Policy",
                            content: (
                                <>
                                    <p>
                                        Shipping to us: choose your carrier, a box or envelope with
                                        adequate packaging material, and send it to
                                    </p>
                                    <br />
                                    <p className="ml-6">
                                        5R Photo Lab<br />
                                        31 Washington Square West<br />
                                        Suite 3R-C<br />
                                        New York, NY 10011
                                    </p>
                                    <br />
                                    <p>
                                        Be sure to include a note and get a tracking number from your
                                        carrier. Visit{" "}
                                        <a
                                            href="https://www.5rphotolab.com/mail-in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-orange)] underline"
                                        >
                                            How to Ship Your Film
                                        </a>{" "}
                                        for detailed instructions and a printable order form.
                                    </p>
                                    <br />
                                    <p>
                                        5R Photo Lab accepts shipments from all carriers—whatever’s most
                                        convenient for you, whatever’s most comfortable. You are responsible
                                        for shipping your film to the lab and responsible for the cost of
                                        return shipping if you choose to save your negatives or order prints.
                                        We recommend using a service that includes a tracking number. For
                                        discounted postage, we recommend Pirate Ship.
                                    </p>

                                </>
                            )
                        }}
                        isOpen={openAccordion.includes(0)}
                        onToggle={toggleAccordion}
                    />

                </div>
                <div className="mt-5">
                    <AccordionItem
                        index={1}
                        item={{ title: "Return Policy", content: "We do not offer refunds for services rendered or products. Film developed blank is eligible for a $10 credit for lab services only. Unopened, unused items may be returned for credit at 5R’s discretion." }}
                        isOpen={openAccordion.includes(1)}
                        onToggle={toggleAccordion}
                    />
                </div>
                <div className="mt-5">
                    <AccordionItem
                        index={2}
                        item={{ title: "Limitation of Liability", content: "Submitting any tangible or electronic media, image, data, file, card, disc, device, film, print, slide or negative for, any purpose, such as processing, printing, duplication, alteration, enlargement, storage, transmission, or other handling, constitutes an AGREEMENT that any loss or damage to it by our company, subsidiary or agents, even though by our negligence or other fault, will only entitle you to replacement with an equivalent quantity/size, of unexposed photographic film or electronic media, and processing of the replacement media Except for such replacement, our acceptance of the media, Image, data, file, card, disc, device, film, print, slide, or negative is without other liability, and recovery for any incidental or consequential damage is excluded. No express or implied warranty is provided." }}
                        isOpen={openAccordion.includes(2)}
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
                        <h1 className='font-atkinson-bold text-[16px] text-[var(--color-orange)] flex relative gap-2 mt-10 tracking-wider'>Helpful Information <img src={infoIcon} alt="Info Icon" /></h1>
                    </>
                )}


                <div className={`${page === "product-details" ? "mt-5" : "mt-2"}`}>
                    <AccordionItem
                        index={0}
                        item={{
                            title: "Shipping Policy",
                            content: (
                                <>
                                    <p>
                                        Shipping to us: choose your carrier, a box or envelope with
                                        adequate packaging material, and send it to
                                    </p>
                                    <br />
                                    <p className="ml-6">
                                        5R Photo Lab<br />
                                        31 Washington Square West<br />
                                        Suite 3R-C<br />
                                        New York, NY 10011
                                    </p>
                                    <br />
                                    <p>
                                        Be sure to include a note and get a tracking number from your
                                        carrier. Visit{" "}
                                        <a
                                            href="https://www.5rphotolab.com/mail-in"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-orange)] underline"
                                        >
                                            How to Ship Your Film
                                        </a>{" "}
                                        for detailed instructions and a printable order form.
                                    </p>
                                    <br />
                                    <p>
                                        5R Photo Lab accepts shipments from all carriers—whatever’s most
                                        convenient for you, whatever’s most comfortable. You are responsible
                                        for shipping your film to the lab and responsible for the cost of
                                        return shipping if you choose to save your negatives or order prints.
                                        We recommend using a service that includes a tracking number. For
                                        discounted postage, we recommend Pirate Ship.
                                    </p>

                                </>
                            )
                        }}
                        isOpen={openAccordion.includes(0)}
                        onToggle={toggleAccordion}
                    />

                </div>
                <div className="mt-5">
                    <AccordionItem
                        index={1}
                        item={{
                            title: "Return Policy",
                            content: "We do not offer refunds for services rendered or products. Film developed blank is eligible for a $10 credit for lab services only. Unopened, unused items may be returned for credit at 5R’s discretion."
                        }}
                        isOpen={openAccordion.includes(1)}
                        onToggle={toggleAccordion}
                    />
                </div>
                <div className="mt-5">
                    <AccordionItem
                        index={2}
                        item={{ title: "Limitation of Liability", content: "Submitting any tangible or electronic media, image, data, file, card, disc, device, film, print, slide or negative for, any purpose, such as processing, printing, duplication, alteration, enlargement, storage, transmission, or other handling, constitutes an AGREEMENT that any loss or damage to it by our company, subsidiary or agents, even though by our negligence or other fault, will only entitle you to replacement with an equivalent quantity/size, of unexposed photographic film or electronic media, and processing of the replacement media Except for such replacement, our acceptance of the media, Image, data, file, card, disc, device, film, print, slide, or negative is without other liability, and recovery for any incidental or consequential damage is excluded. No express or implied warranty is provided." }}
                        isOpen={openAccordion.includes(2)}
                        onToggle={toggleAccordion}
                    />
                </div>
            </div>
        </>

    )
}

export default HelpfulInformation;