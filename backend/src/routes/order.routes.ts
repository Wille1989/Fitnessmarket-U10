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

orderRouter.delete('/delete/:id', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    deleteOrder);

orderRouter.delete('/delete/:id', 
    verifyToken, 
    requireRole('admin'), 
    deleteOrder);

orderRouter.get('/show', 
    verifyToken, 
    requireRole('customer'), 
    getOrderByID);

orderRouter.get('/show/:id', 
    verifyToken, 
    requireRole('admin'), 
    getOrderByID);

orderRouter.get('/index',
    verifyToken,
    requireRole('customer'),
    getAllOrders);

export default orderRouter;