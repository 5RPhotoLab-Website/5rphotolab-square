import fiveRIcon from '../assets/footer/5ricon.svg';
import igIcon from '../assets/footer/instagramIcon.svg';
import emailAtIcon from '../assets/footer/emailAtIcon.svg';
import { Link } from 'react-router-dom';


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
                {/* <div className='text-[var(--color-dark-gray)] text-[16px] tracking-widest flex flex-col w-[270px] mx-auto'>
                    <p className="mt-14" onClick={() => window.open("https://share.google/G27Rvit6vwDAQEpx3", "_blank")}>
                        31 Washington Square West
                        Suite 3R-C, New York, NY 10011
                    </p>
                    <p className="mt-5">Mon - Sun, 10am - 8pm</p>
                    <a
                        href="tel:+16463194106"
                        className="mt-5 block"
                    >
                        +1 (646) 319 - 4106
                    </a>
                    <img src={igIcon} alt="Instagram Icon" className='w-[31px] h-[31px] mt-5' onClick={() => window.open("https://www.instagram.com/5rphotolab/?hl=en", "_blank")} />
                    <button className='w-[288px] h-[35px] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] tracking-wider text-[16px] font-atkinson-regular text-[#9C9C9C] mt-10'
                        style={{ boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)" }}
                        onClick={() => window.open("http://eepurl.com/ioapWo", "_blank")}
                    >
                        <img src={emailAtIcon} className="mr-3 -mt-0 inline-block" alt="Email Icon" />Subscribe To Our Newsletter</button>

                    <p className='text-[12px] mt-14'>FAQ</p>

                    <Link to="/accessible-site"><p className='text-center text-[12px] font-arial bg-white max-w-[110px] underline cursor-pointer mt-14'>Accessible site</p></Link>

                </div>

                <div className='flex justify-center mt-10'>
                    <img src={fiveRIcon} alt="5R Photo Lab Icon" className='mb-5' />
                </div> */}
                <div className='flex relative items-center gap-10 px-8 py-8'>
                    <div className="flex flex-col text-[10px] text-[var(--color-dark-gray)] text-left tracking-widest">
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