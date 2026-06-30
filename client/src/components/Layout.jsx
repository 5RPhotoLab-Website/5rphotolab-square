import Footer from "./Footer";
import NavDesktopLayout from "./NavDesktopLayout";
import NavMobileLayout from "./NavMobileLayout";

const Layout = ({ products, colorProducts, merchandiseProducts }) => {
    return (
        <div>
            {/* Desktop */}
            <div className="hidden md:block">
                <NavDesktopLayout
                    products={products}
                    colorProducts={colorProducts}
                    merchandiseProducts={merchandiseProducts}
                />
                <Footer />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <NavMobileLayout
                    products={products}
                    colorProducts={colorProducts}
                    merchandiseProducts={merchandiseProducts}
                />
                <Footer />
            </div>

        </div>
    );
};

export default Layout;


