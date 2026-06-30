import { Outlet } from "react-router-dom";
// import NavMobile from "./NavMobile";
import navTitle from '../assets/navbar/navTitle.svg';
import navTitleNoFilmy from '../assets/navbar/navTitleNoFilmy.svg';
import cartIcon from '../assets/navbar/cartIcon.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from '../context/CartContext';

const NavMobileLayout = ({ products, colorProducts, merchandiseProducts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);


  return (
    <div className='md:hidden bg-[#F5F5F5] font-atkinson-regular'>
      {/* Mobile */}
      <div className="p-2">
        <div className='relative flex justify-center p-2'>
          <img
            src={isHome ? navTitleNoFilmy : navTitle}
            className={isHome ? "pt-2" : ""}
            alt="5R Photo Lab"
          />
          <button
            className={`absolute right-1 ${isHome ? "bottom-2" : "bottom-5.5"}`}
            onClick={() => navigate("/cart")}
          >
            <img src={cartIcon} alt="Shopping Cart" className='w-[30px] h-[30px]' />

            {totalItems > 0 && (
              <span className="absolute top-3 right-3.5  flex items-center justify-center text-[var(--color-orange)] text-[12px] font-atkinson-bold">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        <p className='text-[15.5px] font-atkinson-bold tracking-wider text-center mt-1'>HEAVEN FOR LIGHTS, SHADOWS AND MEMORIES</p>
        <div className='flex relative justify-between mt-5 p-2'>
          <button className="w-[93px] py-1 border-3 rounded-[10px] bg-[var(--color-orange)] tracking-wider text-[13px]  flex items-center justify-center" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
            onClick={() => navigate("/")}>HOME</button>
          <button className="w-[93px] border-3 rounded-[10px] bg-[var(--color-blue)] tracking-wider text-[13px]  flex items-center justify-center" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
            onClick={() => navigate("/mail-in")}>MAIL-IN</button>
          <button className="w-[93px] border-3 rounded-[10px] bg-[#13C5C8] tracking-wider text-[13px]  flex items-center justify-center" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
            onClick={() => navigate("/drop-off")}>DROP-OFF</button>
          <button className="w-[93px] border-3 rounded-[10px] bg-[#E1388D] tracking-wider text-[13px]  flex items-center justify-center" style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 1)" }}
            onClick={() => navigate("/info")}>INFO</button>
        </div>
      </div>
      <Outlet context={{ colorProducts, merchandiseProducts }} />
    </div>
  );
};

export default NavMobileLayout;