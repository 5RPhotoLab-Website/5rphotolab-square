import * as Sentry from "@sentry/node";
import "./instrument.js";
import express from 'express';
import './config/dotenv.js'
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import ordersRouter from './routes/ordersRoutes.js';
import cartsRouter from './routes/cartRoutes.js';
import productsRouter from './routes/productsSquareRoutes.js';
import webhookRouter from './routes/webhookRoutes.js';
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit';

// General limit for all API routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 min per IP
    message: { error: 'Too many requests, please try again later.' }
});

// Stricter limit for checkout specifically
const checkoutLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // only 10 checkout attempts per 15 min
    message: { error: 'Too many checkout attempts, please try again later.' }
});

const app = express();
const port = process.env.PORT || 5050;

app.use('/api/webhooks', webhookRouter);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://www.5rphotolab.com", "https://5rphotolab.com"], // your frontend URL
  credentials: true
}));

app.use('/api', apiLimiter);
app.use('/api/orders/checkout', checkoutLimiter);
// app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/cart', cartsRouter);
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
