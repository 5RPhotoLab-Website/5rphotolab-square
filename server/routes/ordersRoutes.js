// routes/ordersRoutes.js
import express from 'express';
import OrdersController from '../controllers/ordersCRUD.js';

const ordersRouter = express.Router();

ordersRouter.post('/checkout', OrdersController.createCheckout);
ordersRouter.get('/:orderId', OrdersController.getOrderById);
ordersRouter.get('/:orderId/items', OrdersController.getOrderItems);

export default ordersRouter;