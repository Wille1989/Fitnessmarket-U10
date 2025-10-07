import express from 'express';
import { Router } from 'express';
import { 
    createOrder,
    deleteOrder,
    getOrder
} from '../controllers/order.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.post('/order/checkout', verifyToken, requireRole('consumer', 'admin'), createOrder);

orderRouter.get('/order/delete-order/:id', verifyToken, requireRole('consumer', 'admin'), deleteOrder);

orderRouter.get('/order/user-order/:id', verifyToken, requireRole('consumer', 'admin'), getOrder);

orderRouter.get('/admindashboard/order/get-all-orders', verifyToken, requireRole('admin'), getOrder);

export default Router;