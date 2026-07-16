// server/controllers/cartsCRUD.js
import { pool } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

// Helper: get or create cart by session_id
const getOrCreateCart = async (session_id) => {
  let cartResult = await pool.query(
    `SELECT * FROM carts WHERE session_id = $1 LIMIT 1`,
    [session_id]
  );

  if (cartResult.rows.length > 0) return cartResult.rows[0];

  // Create new cart
  const newCartResult = await pool.query(
    `INSERT INTO carts (session_id, cart_data) VALUES ($1, $2) RETURNING *`,
    [session_id, { products: [] }]
  );
  return newCartResult.rows[0];
};

// Get cart
const getCart = async (req, res) => {
  try {
    let session_id = req.headers["x-session-id"];
    if (!session_id) session_id = uuidv4();

    const cart = await getOrCreateCart(session_id);

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or update a product
const isSameModifiers = (a = {}, b = {}) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every(key => a[key] === b[key]);
};

//Add or update a product
const addProductToCart = async (req, res) => {
  try {
    let session_id = req.headers["x-session-id"];
    if (!session_id) session_id = uuidv4();

    const cart = await getOrCreateCart(session_id);

    const { product_id, name, quantity, catalogPrice, unitPrice, imageUrl, modifiers, variation_id } = req.body;
    if (!product_id || !quantity || !catalogPrice || !name || !unitPrice || !imageUrl || !modifiers || !variation_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the exact product with same modifiers exists
    const products = cart.cart_data.products || [];
    const existingIndex = products.findIndex(
      (p) =>
        p.product_id === product_id &&
        isSameModifiers(p.modifiers, modifiers)
    );

    if (existingIndex > -1) {
      products[existingIndex].quantity += quantity;

      if (products[existingIndex].quantity <= 0) {
        products.splice(existingIndex, 1);
      }
    } else {
      products.push({ product_id, name, quantity, catalogPrice, unitPrice, imageUrl, modifiers, variation_id });
    }

    const updatedCart = await pool.query(
      `UPDATE carts
       SET cart_data = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [{ products }, cart.id]
    );

    res.status(201).json({ cart: updatedCart.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an product
const removeProductFromCart = async (req, res) => {
  try {
    let session_id = req.headers["x-session-id"];
    if (!session_id) return res.status(400).json({ error: "Missing session" });

    const cart = await getOrCreateCart(session_id);
    const { product_id, modifiers } = req.body;

    let products = cart.cart_data.products || [];
    products = products.filter(
      (p) =>
        !(p.product_id === product_id &&
          isSameModifiers(p.modifiers, modifiers))
    );

    const updatedCart = await pool.query(
      `UPDATE carts
       SET cart_data = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [{ products }, cart.id]
    );

    res.status(200).json({ cart: updatedCart.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    let session_id = req.headers["x-session-id"];
    if (!session_id) return res.status(400).json({ error: "Missing session" });

    const cart = await getOrCreateCart(session_id);

    const updatedCart = await pool.query(
      `UPDATE carts
       SET cart_data = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [{ products: [] }, cart.id]
    );

    res.status(200).json({ cart: updatedCart.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getCart, addProductToCart, removeProductFromCart, clearCart };
