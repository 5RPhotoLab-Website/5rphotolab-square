import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // for generating session IDs

const CartContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // cart = array of products
    const [sessionId, setSessionId] = useState(null);

    // Initialize session
    useEffect(() => {
        let session = localStorage.getItem("cart_session_id");
        if (!session) {
            session = uuidv4();
            localStorage.setItem("cart_session_id", session);
        }
        setSessionId(session);
    }, []);

    // Fetch cart for this session
    useEffect(() => {
        if (!sessionId) return;
        const fetchCart = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/cart`, {
                    headers: { "x-session-id": sessionId },
                });
                if (res.ok) {
                    const data = await res.json();
                    setCart(data.cart?.cart_data?.products || []);
                }
            } catch (err) {
                console.error("Failed to fetch cart:", err);
            }
        };
        fetchCart();
    }, [sessionId]);

    // Add or update a product
    const addProduct = async (product) => {
        if (!sessionId) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                const data = await res.json();

                // ✅ Replace entire cart from backend
                setCart(data.cart.cart_data.products || []);
            }
        } catch (err) {
            console.error("Failed to add product:", err);
        }
    };

    const refreshCart = async () => {
        if (!sessionId) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart`, {
                headers: { "x-session-id": sessionId },
            });
            if (res.ok) {
                const data = await res.json();
                setCart(data.cart?.cart_data?.products || []);
            }
        } catch (err) {
            console.error("Failed to refresh cart:", err);
        }
    };

     // Remove a product
    const removeProduct = async (product_id, modifiers) => {
        if (!sessionId) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-session-id": sessionId,
                },
                body: JSON.stringify({ product_id, modifiers }),
            });

            if (res.ok) {
                const data = await res.json();
                setCart(data.cart.cart_data.products || []);
            }
        } catch (err) {
            console.error("Failed to remove product:", err);
        }
    };


    return (
        <CartContext.Provider
            value={{ cart, addProduct, removeProduct, sessionId, refreshCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
