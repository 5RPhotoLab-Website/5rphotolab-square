// routes/ordersRoutes.js
import express from 'express';
import OrdersController from '../controllers/ordersCRUD.js';

const ordersRouter = express.Router();

ordersRouter.post("/pay", OrdersController.payOrder);
ordersRouter.get('/:orderId', OrdersController.getOrderById);
ordersRouter.get('/:orderId/items', OrdersController.getOrderItems);

export default ordersRouter;