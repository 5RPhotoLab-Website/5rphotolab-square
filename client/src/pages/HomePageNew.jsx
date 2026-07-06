import review1 from '../assets/homepage/review1.svg';
import review2 from '../assets/homepage/review2.svg';
import review3 from '../assets/homepage/review3.svg';
import review4 from '../assets/homepage/review4.svg';
import review5 from '../assets/homepage/review5.svg';
import review6 from '../assets/homepage/review6.svg';
import filmyOnlyIcon from '../assets/homepage/filmyOnlyIcon.png';
import Labmap from '../assets/homepage/Labmap.png';
import { useNavigate } from 'react-router-dom';


const HomePageNew = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-[#F5F5F5]'>
            {/* Desktop */}
            <div className="hidden md:flex justify-center pt-[6vh] pb-[6vh] mb-20">
                <div className="max-w-[76vw] grid grid-cols-2 gap-[12vw] items-start">
                    <div className='space-y-10'>
                        <div className='w-[22vw] h-[28vh] border-4 rounded-[10px] flex flex-col items-center justify-center mx-auto bg-[var(--color-white)]' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                            <h1 className='w-auto px-8 py-1 border-4 rounded-[10px] font-atkinson-bold text-[1.042vw] text-center bg-[var(--color-yellow)]' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>EXPERT FILM SERVICES<br />PRO DEVELOP AND SCAN<br />BOUTIQUE EXPERIENCE</h1>
                            <div className='flex justify-between items-center mt-4 space-x-5 mx-auto'>
                                <img src={filmyOnlyIcon} alt="Filmy Icon" className='w-[88px] h-[88px] ml-2' />
                                <p className='font-atkinson-bold text-[0.7vw] tracking-wider text-left flex-1 max-w-[26.042vw] leading-4.5 mr-2'>
                                    5R Photo Lab processes C-41 color and B&W film in 35mm, 120, 110, APS, and disposable cameras, offering digital files and prints. We digitize old negatives, slides, and photos. And yes, 5R Photo Lab sells film! </p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-8 cursor-pointer">
                            <div className="w-[10vw] h-[7.604vw] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/drop-off")}>
                                <h1 className='font-bubblicious text-[var(--color-orange)] text-[2.604vw] tracking-widest'>NYC</h1>
                                <div className='text-[0.781vw] font-atkinson-bold text-center tracking-wider -mt-1'>
                                    <p>DROP-OFF</p>
                                    <p>IN-PERSON</p>
                                </div>
                            </div>

                            <div className="w-[10vw] h-[7.604vw] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/mail-in")}>
                                <h1 className='font-bubblicious text-[var(--color-orange)] text-[2.604vw] tracking-widest'>MAIL</h1>
                                <div className='text-[0.781vw] font-atkinson-bold text-center tracking-wider -mt-1'>
                                    <p>START YOUR</p>
                                    <p>MAIL-IN ORDER</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <img src={mapDesktop} alt="Map" className="absolute top-55 transform -translate-y-1/2 right-60 z-0" /> */}
                    <img src={Labmap} alt="Map" className="relative justify-center items-center" />

                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                    <div className='w-[396px] h-[240px] border-4 rounded-[10px] flex flex-col items-center mt-4 bg-[var(--color-white)]' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        <button className='w-auto px-8 py-1 border-4 rounded-[10px] font-atkinson-bold text-[20px] bg-[var(--color-yellow)] mt-3' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>EXPERT FILM SERVICES<br />PRO DEVELOP AND SCAN<br />BOUTIQUE EXPERIENCE</button>
                        <div className='flex justify-between items-center mt-4 gap-4'>
                            <img src={filmyOnlyIcon} alt="Filmy Icon" className='w-[88px] h-[88px]' />
                            <p className='font-atkinson-bold text-[10px] tracking-wider text-left w-[240px] leading-4.5'>
                                5R Photo Lab processes C-41 color and B&W film in 35mm, 120, 110, APS, and disposable cameras, offering digital files and prints. We digitize old negatives, slides, and photos. And yes, 5R Photo Lab sells film! </p>
                        </div>
                    </div>

                    <div className="w-full flex justify-center gap-4 mt-6">
                        <div className="w-[188px] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/drop-off")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>NYC</h1>
                            <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>DROP-OFF</p>
                                <p>IN-PERSON</p>
                            </div>
                        </div>

                        <div className="w-[188px] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/mail-in")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>MAIL</h1>
                            <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>START YOUR</p>
                                <p>MAIL-IN ORDER</p>
                            </div>
                        </div>
                    </div>

                    <img src={Labmap} alt="Map" className="w-full relative z-0 mt-10" />

                {/* <div className="relative w-full mt-0"> */}

                    {/* MAP (background layer) */}
                    {/* <img
                        src={map}
                        alt="Map"
                        className="w-full relative z-0 mt-55"
                    /> */}

                    {/* <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-[396px] h-[240px] border-4 rounded-[10px] flex flex-col items-center mt-4 z-10 bg-[var(--color-white)]' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        <button className='w-auto px-8 py-1 border-4 rounded-[10px] font-atkinson-bold text-[20px] bg-[var(--color-yellow)] mt-3' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>EXPERT FILM SERVICES<br />PRO DEVELOP AND SCAN<br />BOUTIQUE EXPERIENCE</button>
                        <div className='flex justify-between items-center mt-4 gap-4'>
                            <img src={filmyOnlyIcon} alt="Filmy Icon" className='w-[88px] h-[88px]' />
                            <p className='font-atkinson-bold text-[10px] tracking-wider text-left w-[240px] leading-4.5'>
                                5R Photo Lab processes C-41 color and B&W film in 35mm, 120, 110, APS, and disposable cameras, offering digital files and prints. We digitize old negatives, slides, and photos. And yes, 5R Photo Lab sells film! </p>
                        </div>
                    </div> */}

                    {/* BUTTONS (overlay) */}
                    {/* <div className="absolute top-80 left-0 w-full flex justify-center gap-4 z-10 mt-[-40px]">
                        <div className="w-[188px] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/drop-off")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>NYC</h1>
                            <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>DROP-OFF</p>
                                <p>IN-PERSON</p>
                            </div>
                        </div>

                        <div className="w-[188px] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/mail-in")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>MAIL</h1>
                            <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>START YOUR</p>
                                <p>MAIL-IN ORDER</p>
                            </div>
                        </div>
                    </div> */}
                    {/* <p className='absolute top-118 right-13 text-[11px] font-atkinson-regular'>Uptown</p>
                    <p className='absolute top-147 right-41 -rotate-64 text-[11px] font-atkinson-regular tracking-widest'>Central Park</p>
                    <p className='absolute top-160 left-13 text-[11px] font-atkinson-regular'>Midtown</p>
                    <div className="absolute top-165 right-4  px-4 py-2 border-4 rounded-[10px] bg-[var(--color-yellow)] tracking-wider items-right text-[14px] font-bubblicious mb-15 mt-15" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>VISIT US IN NYC</div>
                    <p className='absolute top-200 left-5 text-[11px] font-atkinson-regular'>West Village</p>
                    <p className='absolute top-189 left-33 text-[11px] font-atkinson-regular'>Union Square</p>
                    <p className='absolute top-212 left-26 text-[12.5px] font-atkinson-bold leading-[1] tracking-widest'>Washington<br />Square Park</p>
                    <p className='absolute top-202 right-32 text-[11px] font-atkinson-regular'>East Village</p>
                    <p className='absolute top-225 right-53 text-[11px] font-atkinson-regular'>Downtown</p>
                    <p className='absolute top-255 left-50 text-[26px] font-atkinson-bold leading-[1] tracking-widest'>Washington<br />Square Park</p> */}
                {/* </div> */}

                {/* <div className="inline-flex self-end px-6 py-2 border-4 rounded-[10px] bg-[var(--color-yellow)] tracking-wider items-right text-[14px] font-bubblicious mb-15 mt-15" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>VISIT US IN NYC</div> */}
                {/* <div className="inline-flex px-8 py-2 border-4 rounded-[10px] tracking-wider text-[20px] font-bubblicious mt-20" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>CUSTOMER REVIEWS</div>
                <div className="grid grid-cols-3 grid-rows-2 mt-6">
                    <img src={review1} alt="Customer review 1" className="w-full h-auto block" />
                    <img src={review2} alt="Customer review 2" className="w-full h-auto block pt-2" />
                    <img src={review3} alt="Customer review 3" className="w-full h-auto block" />
                    <img src={review4} alt="Customer review 4" className="w-full h-auto block" />
                    <img src={review5} alt="Customer review 5" className="w-full h-auto block" />
                    <img src={review6} alt="Customer review 6" className="w-full h-auto block" />
                </div>
                <div className="inline-flex px-5 py-1 border-4 rounded-[10px] tracking-wider text-[12px] font-atkinson-regular bg-[var(--color-green)]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>MORE</div> */}
            </div>

        </div>

    )
}

export default HomePageNew;