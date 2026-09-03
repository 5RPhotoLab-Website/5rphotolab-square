import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import arrowUpOrange from '../assets/itemdetails/arrowUpOrange.svg';



const MailInPage = () => {
    const navigate = useNavigate();
    const context = useOutletContext();
    const colorProducts = context?.colorProducts || [];
    const merchandiseProducts = context?.merchandiseProducts || [];
    const products = [...colorProducts, ...merchandiseProducts];

    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (contentRef.current) {
            // Always measure the full scrollHeight, including padding
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen, products]);


    return (
        <div className="bg-[#F5F5F5]">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center pb-[6vh]">
                <div className="text-[0.781vw] max-w-[70vw] py-2 px-2 font-atkinson-regular tracking-wider text-center border-4 rounded-[10px] bg-[var(--color-yellow)] leading-relaxed mb-8" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <p className='font-atkinson-bold text-[0.9vw]'>Stop waiting weeks for your photos and start enjoying your pictures ASAP with 5R Photo Lab's mail-in film service. </p>
                    <p className="mt-3">5R Photo Lab offers a seamless mail-in film developing experience with easy ordering, quick turnaround, and unparalleled customer service, all delivered by imaging professionals with decades of combined experience.
                        5R Photo Lab gets to work on your film right when it arrives: Our typical C-41 turnaround is same or next-day for mail-in orders. We digitize film with the gold standard Noritsu HS-1800 scanner, check all scans for dust and hair,
                        and ensure proper orientation and color calibration. We do all this because you deserve better than other labs' assembly line approach to scans. These are your memories. They should be enjoyable - and sharable - right when they arrive at your inbox.
                        Got a question? We're very friendly, so go ahead and give us a call, shoot us a text, or send us an email! Need info on shipping film? Click <a href="/mail-in/how-to-mail-in" className="text-[var(--color-purple)] underline">here</a>. 
                        If you're ready to start your, order just scroll down. We can't wait to process your film!  </p>
                </div>

                <div className="grid grid-cols-4 grid-rows-2 max-w-[70vw] mx-auto gap-10">
                    {products && products.length > 0 ?
                        products.map((product) => (
                            <div key={product.id} className='p-3 cursor-pointer' onClick={() => navigate(`/products/get/${product.id}`)}>
                                <img src={product.imageUrl} alt={product.name.replace(/^Color\s+/, "")} />
                                <p className='font-atkinson-bold text-[0.833vw] tracking-wider'>{product.name.replace(/^Color\s+/, "")}</p>
                                <p className='font-atkinson-regular text-[0.7vw] tracking-wider'>${product.price}</p>
                            </div>
                        ))
                        :
                        <h3 className="py-10">{'Loading....'}</h3>
                    }
                </div>
                <div className="inline-flex px-10 py-4 border-4 rounded-[10px] tracking-wider text-[0.781vw] font-atkinson-bold bg-[var(--color-green)] cursor-pointer"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>
                    HOW TO SHIP YOUR FILM
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                <div className="text-[3.6vw] py-2 px-2 font-atkinson-regular tracking-wider text-center border-4 rounded-[10px] bg-[var(--color-yellow)] leading-relaxed" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}>
                    <p className='font-atkinson-bold text-[4.3vw]'>Stop waiting weeks for your photos and start enjoying your pictures ASAP with 5R Photo Lab's mail-in film service. </p>
                    <p className='mt-3'>5R Photo Lab offers a seamless mail-in film developing experience with <span className="font-atkinson-bold">easy ordering</span>, <span className="font-atkinson-bold">quick turnaround</span>, and <span className="font-atkinson-bold">unparalleled customer service</span>, all delivered by imaging professionals with decades of combined experience.<br/>
                        5R Photo Lab gets to work on your film right when it arrives: Our typical C-41 turnaround is <span className="font-atkinson-bold">same or next-day for mail-in orders</span>. We digitize film with the gold standard Noritsu HS-1800 scanner, check all scans for dust and hair,
                        and ensure proper orientation and color calibration. We do all this because <span className="font-atkinson-bold">you deserve better</span> than other labs' assembly line approach to scans.<br/> These are your memories. They should be enjoyable - and sharable - right when they arrive at your inbox.
                        Got a question? We're very friendly, so go ahead and give us a call, shoot us a text, or send us an email! Need info on shipping film? Click <a href="/mail-in/how-to-mail-in" className="text-[var(--color-purple)] underline">here</a>. 
                        If you're ready to <span className="font-atkinson-bold">start your order</span> just scroll down. We can't wait to process your film! </p>
                </div>
                <div className="grid grid-cols-2 grid-rows-4 mt-6">
                    {products && products.length > 0 ?
                        products.map((product) => (
                            <div key={product.id} className='p-3' onClick={() => navigate(`/products/get/${product.id}`)}>
                                <img src={product.imageUrl} alt={product.name.replace(/^Color\s+/, "")} />
                                <p className='font-atkinson-bold text-[16px] tracking-wider mt-2'>{product.name.replace(/^Color\s+/, "")}</p>
                                <p className='font-atkinson-regular text-[14px] tracking-wider'>${product.price}</p>
                            </div>
                        ))
                        :
                        <h3 className="py-10">{'Loading...'}</h3>
                    }
                </div>
                <div className="text-center w-[92vw] py-4 border-4 rounded-[10px] tracking-wider  text-[20px] font-atkinson-bold mt-2 mb-8 bg-[var(--color-green)] tracking-wider whitespace-nowrap"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>HOW TO SHIP YOUR FILM</div>
            </div>
        </div>
    )
}

export default MailInPage;