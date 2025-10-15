import express from 'express';
import { Router } from 'express';
import { 
    createOrder,
    deleteOrder,
    getOrderByID,
    getAllOrders,
} from '../controllers/order.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.post('/checkout', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    createOrder);

orderRouter.delete('/delete', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    deleteOrder);

orderRouter.get('/show', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    getOrderByID);

orderRouter.get('/index',
    verifyToken,
    requireRole('customer'),
    getAllOrders);

export default orderRouter;