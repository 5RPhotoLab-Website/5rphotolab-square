import navTitle from '../assets/navbar/navTitle.svg';
import cartIcon from '../assets/navbar/cartIcon.svg';
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { Outlet } from "react-router-dom";


const NavDesktopLayout = ({ products, colorProducts, merchandiseProducts }) => {
    const navigate = useNavigate();
    const { cart } = useCart();

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    return (
        <div className="bg-[#F5F5F5] hidden md:block min-h-screen flex flex-col">

            {/* HEADER (independent — won't move) */}
            <div className="flex justify-center pt-10">
                <div className="relative w-full max-w-[40vw] flex flex-col items-center">

                    <div className="relative w-full flex justify-center">
                        <img src={navTitle} alt="5R Photo Lab" className="w-[24vw]"/>

                        <button
                            className="absolute -right-[2.9vw] -bottom-[1vw] cursor-pointer"
                            onClick={() => navigate("/cart")}
                        >
                            <img src={cartIcon} alt="Shopping Cart" className="w-[2.188vw] cursor-pointer" />

                            {totalItems > 0 && (
                                <span
                                    className={`absolute top-[0.85vw] flex items-center justify-center text-[var(--color-orange)] text-[0.9vw] font-atkinson-bold cursor-pointer 
                                        ${totalItems === 1
                                            ? "right-[1vw]"
                                            : totalItems <= 9
                                                ? "right-[0.95vw]"
                                                : "right-[0.7vw]"
                                        }`}
                                >
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    <p className="text-[0.9vw] font-atkinson-bold tracking-wider mt-1 -ml-2">
                        HEAVEN FOR LIGHTS, SHADOWS AND MEMORIES
                    </p>

                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex-1">

                <div className="flex relative max-w-[40vw] gap-[7vw] items-center justify-center mx-auto mb-10 mt-5">
                    <button className="px-[1.5vw] py-[0.7vh] border-3 rounded-[10px] bg-[var(--color-orange)] tracking-wider text-[0.8vw] cursor-pointer whitespace-nowrap" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/")}>
                        HOME
                    </button>

                    <button className="px-[1.5vw] py-[0.7vh] border-3 rounded-[10px] bg-[var(--color-blue)] tracking-wider text-[0.8vw] cursor-pointer whitespace-nowrap" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/mail-in")}>
                        MAIL-IN
                    </button>

                    <button className="px-[1.2vw] py-[0.7vh] border-3 rounded-[10px] bg-[#13C5C8] tracking-wider text-[0.8vw] cursor-pointer whitespace-nowrap" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/drop-off")}>
                        DROP-OFF
                    </button>

                    <button className="px-[1.5vw] py-[0.7vh] border-3 rounded-[10px] bg-[var(--color-pink)] tracking-wider text-[0.8vw] cursor-pointer whitespace-nowrap" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/info")}>
                        INFO
                    </button>

                    {/* <Link to="/accessible-site"><p className='text-center text-[0.625vw] font-arial bg-white max-w-[5vw] mx-auto underline cursor-pointer'>Accessible site</p></Link> */}
                </div>

                <div className="flex-1">
                    <Outlet context={{ colorProducts, merchandiseProducts }} />
                </div>

            </div>

        </div>
    )

}

export default NavDesktopLayout;