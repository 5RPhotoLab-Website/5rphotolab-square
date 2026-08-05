import arrowRight from '../assets/dropoff/arrowRight.svg';
import dropoffMap from '../assets/dropoff/dropoffMap.svg';

const DropOffPage = () => {
    return (
        <div className="bg-[#F5F5F5] ">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center mx-auto max-w-[76vw] pb-[6vh]">
                <div className="border-4 rounded-[10px] w-full p-3" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <div className='bg-[var(--color-yellow)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[0.833vw] tracking-wider py-2 mt-5' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        WE PROCESS C-41 AND B&W FILM ONLY
                    </div>

                    <div className='bg-[var(--color-green)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[0.833vw] tracking-wider py-2 mt-10' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        STANDARD RESOLUTION 3130X2075 PX
                    </div>

                    <div className='flex justify-between p-5'>
                        <div className='w-[18.229vw]'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] w-full tracking-wider text-center mt-5">35MM COLOR - STANDARD TURNAROUND</h1>
                            <div className='flex justify-between mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>2-Day Dev&Scan</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$19.99</p>
                            </div>
                            <div>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>2-Day Dev&Print Only</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[15.8vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>Disposable Cameras, 24-27 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$23.99</p>
                                </div>
                                <div className='flex justify-between w-[15.75vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>Regular 35mm Roll, 36 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$25.99</p>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>2-Day Half-Frame Dev&Scan</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[15.8vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>Diptychs</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$23.99</p>
                                </div>
                                <div className='flex justify-between w-[15.75vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>Individuals</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$27.99</p>
                                </div>
                            </div>
                        </div>


                        <div className='w-[18.229vw]'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] tracking-wider text-center mt-5">35MM B&W - STANDARD TURNAROUND</h1>
                            <div className='flex justify-between mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>5-Day Dev&Scan</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$19.99</p>
                            </div>
                            <div>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>5-Day Dev&Print Only</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[15.8vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>Disposable Cameras, 24-27 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$23.99</p>
                                </div>
                                <div className='flex justify-between w-[15.75vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>Regular 35mm Roll, 36 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$25.99</p>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>5-Day Half-Frame Dev&Scan</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[15.8vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>Diptychs</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$23.99</p>
                                </div>
                                <div className='flex justify-between w-[15.75vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>Individuals</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$27.99</p>
                                </div>
                            </div>
                        </div>


                        <div className='w-[18.229vw]'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] tracking-wider text-center mt-5">PRINT SET - WE USE LUSTER ONLY</h1>
                            <div className='mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>4X6 Prints</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[15.8vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>24-27 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$07.00</p>
                                </div>
                                <div className='flex justify-between w-[15.75vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>36 Exp.</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$09.00</p>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>5X7 Print</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$04.99</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>8X10 / 8X12 Print</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$15.00</p>
                            </div>
                        </div>
                    </div>



                    <div className='bg-[var(--color-green)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[0.833vw] tracking-wider py-2 mt-5' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        UPGRADE TO HI-RES 6774X4492 PX FOR $7
                    </div>

                    <div className='flex justify-between p-5'>
                        <div className='w-[18.229vw] -mr-15'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] tracking-wider text-center mt-5">MORE FOR A 2-DAY TURNAROUND</h1>
                            <div className='flex justify-between mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>120 Dev&Scan</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$29.99</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>110 Dev&Scan</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$19.99</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>APS Dev&Scan</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$19.99</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>Negatives Scan per Strip/Roll</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$20.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider mt-2'>Scan per Slide/Print, 5 Minimum</h2>
                                <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-2'>$05.00</p>
                            </div>
                        </div>



                        <div className='w-[15.625vw]'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] tracking-wider text-center mt-5">SAME DAY RUSH</h1>
                            <div className='mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>Color</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>35mm</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$45.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>120</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$55.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>110</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$55.00</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>B&W</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>35mm</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$85.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>120</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$85.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>110</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$85.00</p>
                                </div>
                            </div>
                        </div>


                        <div className='w-[15.625vw] mr-5'>
                            <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[0.833vw] tracking-wider text-center mt-5">NEXT DAY RUSH</h1>
                            <div className='mt-4'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>Color</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>35mm</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$35.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>120</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$45.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>110</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$45.00</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h2 className='font-atkinson-bold text-[0.729vw] tracking-wider'>B&W</h2>
                            </div>
                            <div className='relative'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>35mm</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider mt-3'>$75.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>120</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$75.00</p>
                                </div>
                                <div className='flex justify-between w-[13.3vw] ml-auto'>
                                    <h2 className='font-atkinson-regular text-[0.729vw] tracking-wider'>110</h2>
                                    <p className='font-atkinson-regular text-[0.729vw] tracking-wider'>$75.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2 overflow-x-hidden overflow-y-visible">
                <img src={dropoffMap} alt="Drop Off Map" className="w-full pl-2 pr-2 mt-5" />
                <div className="leading-[2] mt-5">
                    <p className="font-atkinson-bold text-[12px] tracking-wider text-center">
                        5R is tucked away in a converted 1850s townhouse on<br/>
                        the west side of Washington Square Park. Our hidden<br/>
                        gem of a film lab is open from 10 AM to 8 PM seven days<br/>
                        a week for film drop-off, negatives and prints pickup,<br/>
                        and film purchasing. Finding us can be tricky the first<br/>
                        time, but you won't forget. If you want to prepare for your<br/>
                        visit, check out this video [link to IG post]
                    </p>
                </div>
                <div
                    className="border-4 bg-[var(--color-yellow)] rounded-[10px] w-[396px] h-[87px] mt-8 flex justify-center items-center"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                >
                    <h2 className="font-atkinson-bold text-[16px] text-black tracking-wider">
                        WE PROCESS C-41 AND B&W FILM ONLY
                    </h2>
                </div>

                <div className="border-4 rounded-[10px] w-[396px] mt-8 mb-8 p-3" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <div className='bg-[var(--color-green)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[16px] tracking-wider py-2 mt-6' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        STANDARD RESOLUTION 3130X2075 PX
                    </div>


                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] w-full tracking-wider text-center mt-6">STANDARD TURNAROUND TIME<br/> FOR C-41 IS TWO DAYS,<br/> B&W IS APPROXIMATELY FIVE DAYS</h1>
                    <div className='flex justify-between mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>35mm Dev&Scan</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$19.99</p>
                    </div>
                    <div>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>35mm Dev&Print Only</h2>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-end gap-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>Disposable Cameras, 24-27 Exp.</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider mt-3'>$23.99</p>
                        </div>
                        <div className='flex justify-end gap-19'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider'>Regular 35mm Roll, 36 Exp.</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider'>$25.99</p>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>35mm Half-Frame Dev&Scan</h2>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-end gap-52'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>Diptychs</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider mt-3'>$24.99</p>
                        </div>
                        <div className='flex justify-end gap-48'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider'>Individuals</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider'>$27.99</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>110 Dev&Scan (w/ or w/o borders)</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$24.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>APS Dev&Scan (w/ or w/o borders)</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$29.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>120 Dev&Scan (medium format, hi-res)</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$29.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>220 Dev&Scan (medium format, hi-res)</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$49.99</p>
                    </div>



                    <div className='bg-[var(--color-green)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[16px] tracking-wider py-2 mt-5' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        HI-RES 6774X4492 PX FOR $6.99
                    </div>


                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">ADDS-ONS, PER ROLL</h1>
                    <div className='flex justify-between mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Custom Color Grading</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$06.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>TIFFS</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$01.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Hi-Res Scan + 16-bit TIFFS</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$09.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Panoramic Scan for any format</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$09.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Sprocket Scan for 35mm</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$14.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>B&W Push/Pull</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$01.99/Stop</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>B&W Processing for C-41 Old Film</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$05.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Restoration: request an estimate at drop-off</h2>
                    </div>

                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">PRINT SET - WE USE LUSTER ONLY</h1>
                    <div className='mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>4X6 Prints</h2>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-end gap-49'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>24-27 Exp.</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider mt-3'>$08.99</p>
                        </div>
                        <div className='flex justify-end gap-55'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider'>36 Exp.</h2>
                            <p className='font-atkinson-regular text-[14px] tracking-wider'>$10.99</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>5X7 Print</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$04.99</p>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>8X10 / 8X12 Print</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$14.99</p>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex pl-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>or $9.99 for 10+ prints</h2>
                        </div>
                    </div>


                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">SCANS (PER ROLL, CUT OR UNCUT)</h1>
                    <div className='flex justify-between mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>35mm</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$19.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>120 (standard formats)</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$19.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>110</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$24.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>APS</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$29.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Panoramic Formats</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$29.99</p>
                    </div>


                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">NON-FILM ROLL SCANS</h1>
                    <div className='mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Mounted Slides</h2>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex pl-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>$5 each, minimum 5 slides</h2>
                        </div>
                        <div className='flex pl-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider'>$4 each for 50+ slides</h2>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Standard Prints</h2>
                    </div>
                    <div className='relative'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex pl-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider mt-3'>8x10 and smaller: $5 each, minimum 5 prints</h2>
                        </div>
                        <div className='flex pl-12'>
                            <h2 className='font-atkinson-regular text-[14px] tracking-wider'>8x12 and bigger: $19.99</h2>
                        </div>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>VHS Transfer</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$19.99/Tape</p>
                    </div>


                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">RUSH SERVICES FOR C-41 FILM<br/> AND DISPOSABLE CAMERAS</h1>
                    <div className='flex justify-between mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Same-Day</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$44.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Next-Day</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$34.99</p>
                    </div>

                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6">RUSH SERVICES FOR C-41 FILM<br/> IN 120, 110 AND APS FORMATS</h1>
                    <div className='flex justify-between mt-4'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Same-Day</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$54.99</p>
                    </div>
                    <div className='flex justify-between mt-0.5'>
                        <h2 className='font-atkinson-bold text-[14px] tracking-wider'>Next-Day</h2>
                        <p className='font-atkinson-regular text-[14px] tracking-wider'>$44.99</p>
                    </div>

                    <h1 className="font-atkinson-bold text-[var(--color-pink)] text-[16px] tracking-wider text-center mt-6 mb-4">B&W RUSH SERVICES:<br/> PLEASE INQUIRE BEFORE DROP-OFF</h1>


                </div>
            </div>
        </div>
    )
}

export default DropOffPage;