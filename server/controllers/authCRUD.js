import { pool } from "../config/database.js";
import { hashPassword, comparePassword, generateToken } from "../config/auth.js";

const createUserSignUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: "Missing fields" });

    try {
        const hashed = await hashPassword(password);
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashed]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.SQUARE_ENV === "production", // set true when using HTTPS in production only
            // domain: ".5rphotolab.com",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: "Email already in use or server error" });
    }
};

const createUserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        const user = result.rows[0];

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.SQUARE_ENV === "production", // set true when using HTTPS in production only
            // domain: ".5rphotolab.com",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ user: { id: user.id, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const getUser = async (req, res) => {
    res.json({
        user: {
            id: req.user.id,
            email: req.user.email,
        },
    });
};

// optional: logout
const logoutUser = async (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.SQUARE_ENV === "production", sameSite: "none" });
    res.json({ message: "Logged out" });
};

export default {
    createUserSignUp,
    createUserLogin,
    getUser,
    logoutUser,
};
