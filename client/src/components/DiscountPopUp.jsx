import closePopup from "../assets/homepage/closePopUp.svg";
import { useState, useEffect } from "react";


const DiscountPopUp = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("discount_popup_seen");

        if (!hasSeenPopup) {
            setIsOpen(true);
            localStorage.setItem("discount_popup_seen", "true");
        }
    }, []);

    if (!isOpen) return null;
    
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-32px)] max-w-[80vw] md:max-w-[18vw] h-[400px] bg-[var(--color-blue)] border-black border-4 flex flex-col items-center justify-center gap-10 z-[9999]">
            {/* Close button */}
            <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-2 cursor-pointer"
                aria-label="Close discount popup"
            >
                <img
                    src={closePopup}
                    alt=""
                    className="w-6 h-6"
                />
            </button>
            <div className="w-[65vw] md:w-[15vw] h-[132px] bg-[var(--color-yellow)] rounded-[10px] border border-black border-4 font-atkinson-bold flex flex-col items-center justify-center"
                style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                <p className="md:text-[2vw] text-[7vw] tracking-wider">15% Off Your</p>
                <p className="md:text-[1.2vw] text-[5vw] tracking-widest">First Mail-In Order</p>
            </div>
            <div className="w-[65vw] md:w-[15vw] h-[132px] bg-[var(--color-yellow)] rounded-[10px] border border-black border-4 font-atkinson flex flex-col items-center justify-center">
                <p className="md:text-[1vw] text-[5vw] tracking-wider">Use code <span className="font-atkinson-bold">FILMY15</span> for</p>
                <p className="md:text-[1vw] text-[5vw] tracking-wider">new customer discount</p>
            </div>
        </div>
    )
}

export default DiscountPopUp;