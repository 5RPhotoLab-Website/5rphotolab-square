import navTitle from '../assets/navbar/navTitle.svg';
import cartIcon from '../assets/navbar/cartIcon.svg';
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { Outlet } from "react-router-dom";


const NavDesktopLayout = ({ products, colorProducts, merchandiseProducts }) => {
    const navigate = useNavigate();
    const { cart } = useCart();

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    return (
        <div className="bg-[#F5F5F5] hidden md:block">

            {/* HEADER (independent — won't move) */}
            <div className="flex justify-center pt-10">
                <div className="relative w-full max-w-[87vw] flex flex-col items-center">

                    <div className="relative w-full flex justify-center">
                        <img src={navTitle} alt="5R Photo Lab" />

                        {/* Cart button aligned to right edge of container */}
                        <button
                            className="absolute right-0 bottom-3 cursor-pointer"
                            onClick={() => navigate("/cart")}
                        >
                            <img src={cartIcon} alt="Shopping Cart" className="w-[30px] h-[30px] cursor-pointer" />

                            {totalItems > 0 && (
                                <span className="absolute top-3 right-3.5 flex items-center justify-center text-[var(--color-orange)] text-[12px] font-atkinson-bold cursor-pointer">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    <p className="text-[15px] font-atkinson-bold tracking-wider mt-1 -ml-1">
                        HEAVEN FOR LIGHTS, SHADOWS AND MEMORIES
                    </p>

                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex mt-10">

                {/* LEFT NAV */}
                <div className="flex flex-col gap-20 items-center pl-30 pt-30">
                    <button className="w-[4.844vw] h-[3.5vh] border-3 rounded-[10px] bg-[var(--color-orange)] tracking-wider text-[0.677vw] cursor-pointer" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/")}>
                        HOME
                    </button>

                    <button className="w-[4.844vw] h-[3.5vh] border-3 rounded-[10px] bg-[var(--color-blue)] tracking-wider text-[0.677vw] cursor-pointer" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/mail-in")}>
                        MAIL-IN
                    </button>

                    <button className="w-[4.844vw] h-[3.5vh] border-3 rounded-[10px] bg-[#13C5C8] tracking-wider text-[0.677vw] cursor-pointer" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/drop-off")}>
                        DROP-OFF
                    </button>

                    <button className="w-[4.844vw] h-[3.5vh] border-3 rounded-[10px] bg-[#E1388D] tracking-wider text-[0.677vw] cursor-pointer" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
                        onClick={() => navigate("/info")}>
                        INFO
                    </button>

                    <Link to="/accessible-site"><p className='text-center text-[0.625vw] font-arial bg-white max-w-[5vw] mx-auto underline cursor-pointer'>Accessible site</p></Link>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex-1">
                    <Outlet context={{ colorProducts, merchandiseProducts }} />
                </div>

            </div>

        </div>
    )

}

export default NavDesktopLayout;