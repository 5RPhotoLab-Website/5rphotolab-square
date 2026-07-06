import OrderTemplate from '../assets/Order Template 5R.pdf';

const HowToMailInPage = () => {
    return (
        <div className="bg-[#F5F5F5]">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center max-w-[76vw] mx-auto min-h-screen">
                <div className="border-4 w-full rounded-[10px]" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <div className='bg-[var(--color-green)] rounded-[10px] -mx-10 border-4 text-center font-atkinson-bold text-[0.938vw] tracking-wider py-5 mt-5' style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                        All of our great lab services are available by mail, and <br /> getting your film and disposables to us is super easy.
                    </div>
                    <div className='flex items-center justify-between p-[2vw]'>
                        {/* Left side */}
                        <div className="flex flex-col justify-between tracking-wider max-w-[450px] ml-10">
                            <div className='space-y-8'>
                                <p className="font-atkinson-regular text-[0.885vw]"><span className="font-atkinson-bold">1.</span> Write us a little note about your order, including the order number, or fill out the form below.</p>
                                <p className="font-atkinson-regular text-[0.885vw] mt-2"><span className="font-atkinson-bold">2.</span> Place your film in a ziploc.</p>
                                <p className="font-atkinson-regular text-[0.885vw] mt-2"><span className="font-atkinson-bold">3.</span> Place the bag in a padded envelope or a box with padding along with the form.</p>
                                <p className="font-atkinson-regular text-[0.885vw] mt-2"><span className="font-atkinson-bold">4.</span> Address it to:</p>
                                <p className="font-atkinson-regular text-[0.885vw] ml-10 leading-relaxed mt-2">
                                    5R Photo Lab <br />
                                    31 Washington Square West <br />
                                    Suite 3R-C <br />
                                    New York, NY 10011
                                </p>
                                <p className="font-atkinson-regular text-[0.885vw] ml-10 leading-relaxed mt-4">
                                    Be sure to write <span className="font-atkinson-bold underline">Do not X-Ray</span> on the package.
                                </p>
                                <p className="font-atkinson-regular text-[0.885vw] mt-2"><span className="font-atkinson-bold">5.</span> Bring the package to your nearest Post Office, FedEx, or UPS - be sure to get a tracking number.</p>
                            </div>
                        </div>

                        <div className="">
                            <button
                                className="border-4 border-black bg-[var(--color-blue)] px-5 py-2 font-atkinson-regular text-[0.885vw] text-white rounded-[10px] tracking-wider cursor-pointer"
                                style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                                onClick={() => window.open(OrderTemplate)}
                            >
                                Download Form
                            </button>
                        </div>

                        {/* Right side */}
                        <div className="flex-shrink-0 mr-10">
                            <iframe
                                width="350"
                                height="620"
                                src="https://www.youtube.com/embed/FLoB1xzZcsc"
                                title="YouTube video player"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2 mb-10">
                <div className="relative w-[396px]">
                    {/* Floating header */}
                    <div
                        className="absolute top-0 left-0 z-10 border-4 bg-[var(--color-green)] rounded-[10px] w-full"
                        style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    >
                        <h2 className="font-atkinson-bold text-[17px] tracking-wider max-w-[370px] mx-auto leading-[1.4] p-2">
                            All of our great lab services are available by mail, and getting your film and disposables to us is super easy.
                        </h2>
                    </div>

                    {/* Main card */}
                    <div
                        className="border-4 w-full rounded-[10px] flex flex-col relative items-center pt-20"
                        style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    >

                        <div className="p-4.5 tracking-wider mt-10">
                            <p className="font-atkinson-regular text-[17px]"><span className="font-atkinson-bold">1.</span> Write us a little note about your order, including the order number, or fill out the form below. <br /></p>
                            <p className="font-atkinson-regular text-[17px] mt-2"><span className="font-atkinson-bold">2.</span> Place your film in a ziploc. <br /></p>
                            <p className="font-atkinson-regular text-[17px] mt-2"><span className="font-atkinson-bold">3.</span> Place the bag in a padded envelope or a box with padding along with the form. <br /></p>
                            <p className="font-atkinson-regular text-[17px] mt-2"><span className="font-atkinson-bold">4.</span> Address it to:</p>
                            <p className="font-atkinson-regular text-[17px] ml-6 leading-relaxed"><br />
                                5R Photo Lab <br />
                                31 Washington Square West <br />
                                Suite 3R-C <br />
                                New York, NY 10011</p>
                            <br />
                            <p className="font-atkinson-regular text-[17px] ml-6 leading-relaxed">Be sure to write <span className="font-atkinson-bold underline">Do not X-Ray</span><br />on the package.</p> <br />
                            <p className="font-atkinson-regular text-[17px]"><span className="font-atkinson-bold">5.</span> Bring the package to your nearest Post Office, FedEx, or UPS - be sure to get a tracking number.</p>

                        </div>

                        <button
                            className="border-4 border-black bg-[var(--color-blue)] px-3 py-2 font-atkinson-regular text-[17px] text-black rounded-[10px] mt-5 mb-10 tracking-wider"
                            style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                            onClick={() => window.open(OrderTemplate)}
                        >
                            Download Form
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HowToMailInPage;