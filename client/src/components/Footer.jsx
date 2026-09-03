import fiveRIcon from '../assets/footer/5ricon.png';
import igIcon from '../assets/footer/instagramIcon.svg';


const Footer = () => {
    return (
        <div className='bg-[var(--color-pink)] font-atkinson-regular'>
            {/* Desktop */}
            <div className="hidden md:flex justify-center px-20 py-2 z-10 relative">
                <div className="w-full">
                    <div className="flex justify-between items-center text-[var(--color-dark-gray)] text-[0.833vw] tracking-widest">

                        {/* Column 1 */}
                        <div>
                            <p
                                className="cursor-pointer w-full"
                                onClick={() =>
                                    window.open("https://share.google/G27Rvit6vwDAQEpx3", "_blank")
                                }
                            >
                                31 Washington Square West Suite 3R-C, New York, NY 10011
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <p>Mon - Sun, 10am - 8pm</p>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <a href="tel:+16463194106">+1 (646) 319 - 4106</a>
                        </div>
                        {/* Column 4 */}
                        <div>
                            <a href="mailto:info@5rphotolab.com" className="block">info@5rphotolab.com</a>

                        </div>
                        {/* Column 5 */}
                        <div className="flex justify-center">
                            <img
                                src={igIcon}
                                alt="Instagram Icon"
                                className="w-[31px] h-[31px] cursor-pointer"
                                onClick={() =>
                                    window.open(
                                        "https://www.instagram.com/5rphotolab/?hl=en",
                                        "_blank"
                                    )
                                }
                            />
                        </div>
                        {/* Column 6 */}
                        <div className="flex justify-center">
                            <img src={fiveRIcon} alt="5R Photo Lab Icon" />
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <div className='flex relative items-center gap-10 px-8 py-8'>
                    <div className="flex flex-col text-[10px] text-[var(--color-dark-gray)] text-left tracking-widest  whitespace-nowrap">
                        <p onClick={() => window.open("https://share.google/G27Rvit6vwDAQEpx3", "_blank")}>
                            31 Washington Square West<br />
                            Suite 3R-C, New York, NY 10011
                        </p>
                        <p>Mon - Sun, 10am - 8pm</p>
                        <a href="tel:+16463194106" className=" block"> +1 (646) 319 - 4106</a>
                        <a href="mailto:info@5rphotolab.com" className="block">info@5rphotolab.com</a>
                    </div>
                    <div className='flex justify-center'>
                        <img src={fiveRIcon} alt="5R Photo Lab Icon" />
                    </div>
                    <img src={igIcon} alt="Instagram Icon" className='w-[25px] h-[25px]' onClick={() => window.open("https://www.instagram.com/5rphotolab/?hl=en", "_blank")} />
                </div>
            </div>

        </div>
    )
}

export default Footer;