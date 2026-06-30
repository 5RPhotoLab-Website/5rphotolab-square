import fiveRIcon from '../assets/footer/5ricon.svg';
import igIcon from '../assets/footer/instagramIcon.svg';
import emailAtIcon from '../assets/footer/emailAtIcon.svg';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='bg-[var(--color-purple)] font-atkinson-regular'>
            {/* Desktop */}
            <div className="hidden md:flex justify-center w-full px-10 py-10 ">
                <div className="w-full">

                    <div className="flex relative justify-between items-center text-[var(--color-dark-gray)] text-[0.833vw] tracking-widest">

                        {/* Column 1 */}
                        <div>
                            <p
                                className="cursor-pointer w-[15.625vw]"
                                onClick={() =>
                                    window.open("https://share.google/G27Rvit6vwDAQEpx3", "_blank")
                                }
                            >
                                31 Washington Square West <br />Suite 3R-C, New York, NY 10011
                            </p>
                        </div>

                        {/* Column 2 */}
                        <div className="w-[15.625vw] text-[var(--color-dark-gray)] ">
                            <p>Mon - Sun, 10am - 8pm</p>
                            <a href="tel:+16463194106">+1 (646) 319 - 4106</a>
                        </div>

                        {/* Column 3 */}
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

                        {/* Column 4 */}
                        <div className="flex items-start cursor-pointer">
                            <p className="text-[0.681vw] cursor-pointer">FAQ</p>
                        </div>

                        {/* Column 5 */}
                        <div className="flex items-center justify-center cursor-pointer">
                            <button
                                className="w-[15vw] h-[3.5vh] border-4 rounded-[10px] bg-[#F5F5F5] border-[#CECECE] text-[0.833vw] font-atkinson-regular text-[#9C9C9C] cursor-pointer"
                                style={{
                                    boxShadow: "0px 4px 0px rgba(206, 206, 206, 1)",
                                }}
                                onClick={() => window.open("http://eepurl.com/ioapWo", "_blank")}
                            >
                                <img src={emailAtIcon} className="mr-2 inline-block cursor-pointer" />
                                Subscribe To Our Newsletter
                            </button>
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
                <div className='text-[var(--color-dark-gray)] text-[16px] tracking-widest flex flex-col w-[270px] mx-auto'>
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
                </div>
            </div>

        </div>
    )
}

export default Footer;