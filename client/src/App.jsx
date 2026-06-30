import './App.css'
import { useState, useEffect, useRef } from 'react';
import { useRoutes } from 'react-router-dom';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';
import HomePageNew from './pages/HomePageNew';
import MailInPageNew from './pages/MailInPageNew';
import HowToMailInPage from './pages/HowToMailInPage';
import DropOffPage from './pages/DropOffPage';
import YourCartPage from './pages/YourCartPage';
import InfoPage from './pages/InfoPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import Layout from './components/Layout';
import AccessibleSitePage from './pages/AccessibleSitePage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function App() {
  const [colorProducts, setColorProducts] = useState([]);
  const [merchandiseProducts, setMerchandiseProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/all`);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = await res.json();

        // Define your desired order for the Color Category
        const CUSTOM_ORDER = [
          "Color 35mm Dev + Scan",
          "Color Disposable Camera Dev + Scan",
          "Color 120 Dev + Scan",
          "Color 110 Dev + Scan",
          "Color APS Dev + Scan",
        ];

        // Sort logic for Color Products only
        const colorArray = (Array.isArray(data.color) ? data.color : []).sort((a, b) => {
          let indexA = CUSTOM_ORDER.indexOf(a.name);
          let indexB = CUSTOM_ORDER.indexOf(b.name);

          // If product name isn't in CUSTOM_ORDER, push it to the bottom
          if (indexA === -1) indexA = 999;
          if (indexB === -1) indexB = 999;

          return indexA - indexB;
        });

        setColorProducts(colorArray);
        setMerchandiseProducts(data.merchandise);

        const combined = [...colorArray, ...data.blackwhite];
        setProducts(combined);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchAllProducts();
  }, []);

  // ---------------- ROUTES ----------------
  const element = useRoutes([
    {
      element: (
        <Layout
          products={products}
          colorProducts={colorProducts}
          merchandiseProducts={merchandiseProducts}
        />
      ),
      children: [
        {
          path: "/",
          element: <HomePageNew />
        },
        {
          path: "/mail-in",
          element: (
            <MailInPageNew />
          )
        },
        {
          path: "/mail-in/how-to-mail-in",
          element: <HowToMailInPage />
        },
        {
          path: "/drop-off",
          element: <DropOffPage />
        },
        {
          path: "/info",
          element: <InfoPage />
        },
        {
          path: "/products/get/:id",
          element: (
            <ProductDetailsPage
              products={products}
              merchandiseProducts={merchandiseProducts}
            />
          )
        },
        {
          path: "/cart",
          element: <YourCartPage />
        },
        {
          path: "/order/confirmation",
          element: <OrderConfirmationPage />
        },
        {
          path: "/accessible-site",
          element: <AccessibleSitePage />
        },
        {
          path: "*",
          element: <ErrorPage />
        }
      ]
    }
  ]);

  return element;
}

export default App
