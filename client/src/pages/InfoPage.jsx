import arrowRight from '../assets/dropoff/arrowRight.svg';

const InfoPage = () => {
    return (
        <div className="bg-[#F5F5F5] ">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center max-w-[76vw] mx-auto pb-[13vh]">
                <div className="border-4 rounded-[10px] w-full text-[18px] font-atkinson-regular tracking-wider leading-[1.7]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>

                    <div className='flex relative justify-start px-20 py-5 gap-25'>
                        <div className='flex flex-col text-[0.833vw]'>
                            <p>We develop, scan, and print film and disposable <br /> cameras in NYC's Greenwich Village neighborhood.</p>
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
                            <p className="mt-5">Our standard scans are <span className="text-[var(--color-pink)] font-atkinson-bold">3130 by 2075 pixels</span> and<br />our resolution scans are <span className="text-[var(--color-pink)] font-atkinson-bold">6774 by 4492 pixels</span>.</p>
                            <div className='relative mt-1'>
                                <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                                <div className='flex justify-center ml-12'>
                                    <p className='mt-3'>We also offer 16-bit TIFFs for photographers<br />desiring extensive flexibility in post.</p>
                                </div>
                            </div>
                            <p className="mt-5">We only use the highest quality materials at our<br />lab, such as Fuji color chemistry, undiluted<br />Kodak chemistry for B&W, and archival Fuji Luster<br />paper for our inkjet photo prints.</p>
                            <p className="mt-5">Our staff has combined decades of professional<br />imaging experience, so we know what<br />developed photos should look like. Most importantly,<br />we treat your film like our own.  </p>
                        </div>

                        <div className='flex flex-col justify-between text-[0.833vw]'>
                            <p>5R Photo Lab is an in-person retail and mail-in film lab located on Washington Square<br /> Park in Greenwich Village, NYC. 5R Photo Lab opened in 2022 and is now located<br /> at 31 Washington Sq West, Suite 3RC. To discuss an order with us, please call or text<br /> (646) 319-4106, email info@5rphotolab.com, or just drop by.</p>
                            <p className="mt-5">For all C-41 film orders-normal color negative and Ilford XP2-expect an email with<br /> a WeTransfer download link in two days. If you pay for same-day or next-day rush,<br /> you'll get your scans within the same or next-day deadline. For black-and-white, expect<br /> a WeTransfer email about five days after drop-off or receipt of your mail-in shipment.<br /> For orders with C-41 and black-and-white, expect separate WeTransfer emails.</p>
                            <p className="mt-5">5R Photo Lab retains film negatives for 15 days after sending the scans. If you need<br /> more time to pick them up, please indicate this as soon as possible and 5R Photo Lab<br /> will try to accommodate the request. For mail-in orders, negatives are shipped<br /> approximately one week after sending scans.</p>
                            <p className="mt-5">We print photos once you arrange to pick them up. If you purchased prints during<br />drop-off, we will print these photos after you notify us of your intended pick-up time.<br />Your prints will not be ready if you just stop by. We do this to avoid discarding prints<br />that people can't pick up right away.</p>
                            <p className="mt-5">We do not process ECN-2, E-6, or souped film.</p>
                            <p className="mt-5">We provide partial credit for blank rolls. Blanks are generally the result of camera<br/> malfunctions, loading issues, or unshot film being dropped off. If your film is unexposed<br/> or blank, you will receive a $10 credit for the unused portion of your develop and scan,<br/> $20 for 120 film. We do not offer refunds.</p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                <div className="border-4 rounded-[10px] w-[396px] mt-8 mb-8 p-4 text-[13px] font-atkinson-regular tracking-wider leading-[1.7]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
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
                    <p className="mt-5">Our standard scans are <span className="text-[var(--color-pink)] font-atkinson-bold">3130 by 2075 pixels</span> and<br />our resolution scans are <span className="text-[var(--color-pink)] font-atkinson-bold">6774 by 4492 pixels</span>.</p>
                    <div className='relative mt-1'>
                        <img src={arrowRight} alt="Arrow Right" className="absolute left-0 top-4 -translate-y-1/2" />
                        <div className='flex justify-center ml-5'>
                            <p className='mt-3'>We also offer 16-bit TIFFs for photographers<br />desiring extensive flexibility in post.</p>
                        </div>
                    </div>
                    <p className="mt-5">We only use the highest quality materials at our<br />lab, such as Fuji color chemistry, undiluted<br />Kodak chemistry for B&W, and archival Fuji Luster<br />paper for our inkjet photo prints.</p>
                    <p className="mt-5">Our staff has combined decades of professional<br />imaging experience, so we know what<br />developed photos should look like. Most importantly,<br />we treat your film like our own.</p>
                    <p className="mt-5">5R Photo Lab is an in-person retail and mail-in film<br />lab located on Washington Square Park in Greenwich<br />Village, NYC. 5R Photo Lab opened in 2022 and<br /> is now located at 31 Washington Sq West, Suite 3RC.<br /> To discuss an order with us, please call or text<br /> (646) 319-4106, email info@5rphotolab.com, or just drop by.</p>
                    <p className="mt-5">For all C-41 film orders-normal color negative and<br /> Ilford XP2-expect an email with a WeTransfer<br /> download link in two days. If you pay for same-day or<br /> next-day rush, you'll get your scans within<br /> the same or next-day deadline. For black-and-white,<br /> expect a WeTransfer email about five days after<br /> drop-off or receipt of your mail-in shipment. For<br /> orders with C-41 and black-and-white, expect separate WeTransfer emails.</p>
                    <p className="mt-5">5R Photo Lab retains film negatives for 15 days after<br /> sending the scans. If you need more time to pick<br /> them up, please indicate this as soon as possible and<br /> 5R Photo Lab will try to accommodate the request.<br /> For mail-in orders, negatives are shipped approximately one week after sending scans.</p>
                    <p className="mt-5">We print photos once you arrange to pick them up.<br /> If you purchased prints during drop-off, we will print<br /> these photos after you notify us of your intended<br /> pick-up time. Your prints will not be ready if you just<br /> stop by. We do this to avoid discarding prints that<br /> people can't pick up right away.</p>
                    <p className="mt-5">We do not process ECN-2, E-6, or souped film.</p>
                    <p className="mt-5 mb-5">We provide partial credit for blank rolls. Blanks are<br /> generally the result of camera malfunctions,<br /> loading issues, or unshot film being dropped off. If<br /> your film is unexposed or blank, you will receive<br /> a $10 credit for the unused portion of your develop<br /> and scan, $20 for 120 film. We do not offer refunds.</p>
                </div>
            </div>
        </div>
    )
}

export default InfoPage;