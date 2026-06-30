import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const MailInPageNew = () => {
    const navigate = useNavigate();
    const context = useOutletContext();
    const colorProducts = context?.colorProducts || [];
    const merchandiseProducts = context?.merchandiseProducts || [];
    const products = [...colorProducts, ...merchandiseProducts];


    return (
        <div className="bg-[#F5F5F5]">
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center justify-center pb-[6vh]">
                <div className="grid grid-cols-4 grid-rows-2 max-w-[70vw] mx-auto gap-10">
                    {products && products.length > 0 ?
                        products.map((product) => (
                            <div key={product.id} className='p-3 cursor-pointer' onClick={() => navigate(`/products/get/${product.id}`)}>
                                <img src={product.imageUrl} alt={product.name} />
                                <p className='font-atkinson-bold text-[0.833vw] tracking-wider'>{product.name}</p>
                                <p className='font-atkinson-regular text-[0.625vw] tracking-wider'>${product.price}</p>
                            </div>
                        ))
                        :
                        <h3 className="py-10">{'Loading...'}</h3>
                    }
                </div>
                <div className="inline-flex px-10 py-4 border-4 rounded-[10px] tracking-wider text-[0.781vw] font-atkinson-bold bg-[var(--color-green)] cursor-pointer"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>
                    How To Ship Your Film
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex flex-col items-center p-2">
                <div className="inline-flex px-10 py-4 border-4 rounded-[10px] tracking-wider text-[20px] font-atkinson-bold mt-5 bg-[var(--color-green)]"
                    style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                    onClick={() => navigate("/mail-in/how-to-mail-in")}>How To Ship Your Film</div>
                <div className="grid grid-cols-2 grid-rows-4 mt-6">
                    {products && products.length > 0 ?
                        products.map((product) => (
                            <div key={product.id} className='p-3' onClick={() => navigate(`/products/get/${product.id}`)}>
                                <img src={product.imageUrl} alt={product.name} />
                                <p className='font-atkinson-bold text-[16px] tracking-wider'>{product.name}</p>
                                <p className='font-atkinson-regular text-[12px] tracking-wider'>${product.price}</p>
                            </div>
                        ))
                        :
                        <h3 className="py-10">{'Loading...'}</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default MailInPageNew;