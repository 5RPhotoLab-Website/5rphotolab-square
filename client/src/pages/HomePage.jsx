import filmyOnlyIcon from '../assets/homepage/filmyOnlyIcon.svg';
import globe from '../assets/homepage/globe.svg';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-[#F5F5F5]'>
            {/* Desktop */}
            <div className="hidden md:flex justify-center pb-[5vh]">
                <div className='space-y-10'>
                    <div className="relative z-10 w-[45vw] min-h-[28vh] border-4 rounded-[10px] flex flex-col items-center justify-center mx-auto bg-[var(--color-white)] px-[2vw] py-[2vh]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        <h1 className="max-w-full px-[3vw] py-1 border-4 rounded-[10px] font-atkinson-bold text-[1.375vw] text-center tracking-widest bg-[var(--color-yellow)] shrink-0" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                            EXPERT FILM SERVICES
                            <br />
                            PRO DEVELOP AND SCAN
                            <br />
                            BOUTIQUE EXPERIENCE
                        </h1>

                        <div className="flex items-center mt-4 gap-[1.5vw] w-[26vw]">

                            <img
                                src={filmyOnlyIcon}
                                alt="Filmy Icon"
                                className="shrink-0"
                            />

                            <p className="flex-1 min-w-0 font-atkinson-bold text-[0.75vw] tracking-wider text-left leading-[1.6rem]">
                                5R Photo Lab processes C-41 color and B&W
                                film in 35mm, 120, 110, APS, and disposable
                                cameras, offering digital files and prints.
                                We digitize old negatives, slides, and photos.
                                And yes, 5R Photo Lab sells film!
                            </p>
                        </div>
                    </div>
                    <div className="relative flex justify-between items-center gap-8 cursor-pointer pb-[12vw]">
                        {/* Map */}
                        <img
                            src={globe}
                            alt="Map"
                            className="absolute left-1/2 top-[10vw] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[21.25vw]"
                        />
                        <div className="relaitve z-10 w-[10vw] h-[7.604vw] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/drop-off")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[2.604vw] tracking-widest'>NYC</h1>
                            <div className='text-[0.781vw] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>DROP-OFF</p>
                                <p>IN-PERSON</p>
                            </div>
                        </div>

                        <div className="relative z-10 w-[10vw] h-[7.604vw] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/mail-in")}>
                            <h1 className='font-bubblicious text-[var(--color-orange)] text-[2.604vw] tracking-widest'>MAIL</h1>
                            <div className='text-[0.781vw] font-atkinson-bold text-center tracking-wider -mt-1'>
                                <p>START YOUR</p>
                                <p>MAIL-IN ORDER</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                <div className=' relative w-[92vw] border-4 rounded-[10px] flex flex-col items-center mt-4 bg-[var(--color-white)]' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <button className='max-w-full px-[6vw] py-1 border-4 rounded-[10px] font-atkinson-bold text-[20px] bg-[var(--color-yellow)] mt-3 tracking-wider' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>EXPERT FILM SERVICES<br />PRO DEVELOP AND SCAN<br />BOUTIQUE EXPERIENCE</button>
                    <div className='flex justify-between items-center mt-4 gap-4'>
                        <img src={filmyOnlyIcon} alt="Filmy Icon" className='w-[88px] h-[88px] mb-2' />
                        <p className='font-atkinson-bold text-[10px] tracking-wider text-left w-[240px] leading-4.5 mb-2'>
                            5R Photo Lab processes C-41 color and B&W film in 35mm, 120, 110, APS, and disposable cameras, offering digital files and prints. We digitize old negatives, slides, and photos. And yes, 5R Photo Lab sells film! </p>
                    </div>
                </div>

                <div className="w-full flex justify-between px-2 mt-6">
                    <div className="w-[41.778vw] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/drop-off")}>
                        <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>NYC</h1>
                        <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                            <p>DROP-OFF</p>
                            <p>IN-PERSON</p>
                        </div>
                    </div>

                    <div className="w-[41.778vw] h-[146px] border-4 rounded-[10px] flex flex-col items-center justify-center bg-white" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }} onClick={() => navigate("/mail-in")}>
                        <h1 className='font-bubblicious text-[var(--color-orange)] text-[50px] tracking-widest'>MAIL</h1>
                        <div className='text-[15px] font-atkinson-bold text-center tracking-wider -mt-1'>
                            <p>START YOUR</p>
                            <p>MAIL-IN ORDER</p>
                        </div>
                    </div>
                </div>

                <img src={globe} alt="Map" className="w-full relative z-0 mt-10 mb-10" />

            </div>

        </div>

    )
}

export default HomePage;