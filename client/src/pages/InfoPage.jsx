import arrowRight from '../assets/dropoff/arrowRight.svg';

const InfoPage = () => {
    return (
        <div className="bg-[#F5F5F5] ">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center max-w-[76vw] mx-auto pb-[13vh]">
                <div className="border-4 rounded-[10px] w-full text-[18px] font-atkinson-regular tracking-wider leading-[1.7]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <div className='bg-[var(--color-yellow)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[0.833vw] tracking-wider py-2 mt-15' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        WELCOME TO THE FAMILY!
                    </div>

                    <div className='flex relative justify-center gap-40 p-20'>
                        <div className='flex flex-col text-[0.833vw]'>
                            <p className="mt-5">We develop, scan, and print film and disposable <br /> cameras in NYC's Greenwich Village neighborhood.</p>
                            <p className="mt-5">We process color <span className="text-[var(--color-pink)] font-atkinson-bold">C-41</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">B&W</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">35mm</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">110</span>, and <br /><span className="text-[var(--color-pink)] font-atkinson-bold">medium format</span> films. </p>
                            <div className='relative mt-1'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-center ml-5'>
                                    <p className='mt-3'>We also offer archival scanning services, <br />to digitize film negatives, slides, and prints.</p>
                                </div>
                            </div>
                            <p className="mt-5">We use a top-of-the-line <span className="text-[var(--color-pink)] font-atkinson-bold">Noritsu HS-1800 scanner</span><br />and gold standard <span className="text-[var(--color-pink)] font-atkinson-bold">Noritsu V-30 color film processor</span>.</p>
                            <div className='relative mt-1'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-center ml-5'>
                                    <p className='mt-3'>Our scanner is routinely calibrated to deliver<br />the highest-quality images, with<br />an accurate palette and nuanced depth.</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col text-[0.833vw]'>
                            <p className="mt-5">Our standard scans are<span className="text-[var(--color-pink)] font-atkinson-bold"> 3130 by 2075 pixels </span>and<br />our resolution scans are <span className="text-[var(--color-pink)] font-atkinson-bold">6774 by 4492 pixels</span>.</p>
                            <div className='relative mt-1'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-center ml-12'>
                                    <p className='mt-3'>We also offer 16-bit TIFFs for photographers<br />desiring extensive flexibility in post.</p>
                                </div>
                            </div>
                            <p className="mt-5">We only use the highest quality materials at our<br />lab, such as Fuji color chemistry, undiluted<br />Kodak chemistry for B&W, and archival Fuji Luster<br />paper for our inkjet photo prints.</p>
                            <p className="mt-5">Our staff has combined decades of professional<br />imaging experience, so we know what<br />developed photos should look like. Most importantly,<br />we treat your film like our own.  </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                <div className="border-4 rounded-[10px] w-[396px] mt-8 p-4 text-[13px] font-atkinson-regular tracking-wider leading-[1.7]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <p className="mt-5">We develop, scan, and print film and disposable <br /> cameras in NYC's Greenwich Village neighborhood.</p>
                    <p className="mt-5">We process color <span className="text-[var(--color-pink)] font-atkinson-bold">C-41</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">B&W</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">35mm</span>, <span className="text-[var(--color-pink)] font-atkinson-bold">110</span>, and <br /><span className="text-[var(--color-pink)] font-atkinson-bold">medium format</span> films. </p>
                    <div className='relative mt-1'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-center ml-5'>
                            <p className='mt-3'>We also offer archival scanning services, <br />to digitize film negatives, slides, and prints.</p>
                        </div>
                    </div>
                    <p className="mt-5">We use a top-of-the-line <span className="text-[var(--color-pink)] font-atkinson-bold">Noritsu HS-1800 scanner</span><br />and gold standard <span className="text-[var(--color-pink)] font-atkinson-bold">Noritsu V-30 color film processor</span>.</p>
                    <div className='relative mt-1'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-center ml-5'>
                            <p className='mt-3'>Our scanner is routinely calibrated to deliver<br />the highest-quality images, with<br />an accurate palette and nuanced depth.</p>
                        </div>
                    </div>
                    <p className="mt-5">Our standard scans are<span className="text-[var(--color-pink)] font-atkinson-bold">3130 by 2075 pixels</span>and<br />our resolution scans are <span className="text-[var(--color-pink)] font-atkinson-bold">6774 by 4492 pixels</span>.</p>
                    <div className='relative mt-1'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-center ml-5'>
                            <p className='mt-3'>We also offer 16-bit TIFFs for photographers<br />desiring extensive flexibility in post.</p>
                        </div>
                    </div>
                    <p className="mt-5">We only use the highest quality materials at our<br />lab, such as Fuji color chemistry, undiluted<br />Kodak chemistry for B&W, and archival Fuji Luster<br />paper for our inkjet photo prints.</p>
                    <p className="mt-5">Our staff has combined decades of professional<br />imaging experience, so we know what<br />developed photos should look like. Most importantly,<br />we treat your film like our own.  </p>
                    <p className='mt-7 text-[var(--color-pink)] font-atkinson-bold text-center mb-2'>Welcome to the family!</p>
                </div>
            </div>
        </div>
    )
}

export default InfoPage;