// routes/webhookRoutes.js
import express from 'express';
import { handleSquareWebhook } from '../controllers/webhookSquare.js';

const webhookRouter = express.Router();

// Raw body needed for signature verification — must come before express.json()
webhookRouter.post('/square', express.raw({ type: 'application/json' }), (req, res, next) => {
    req.rawBody = req.body.toString('utf8');
    next();
}, handleSquareWebhook);

export default webhookRouter;