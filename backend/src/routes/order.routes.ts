import express from 'express';
import { Router } from 'express';
import { 
    createOrder,
    getOrderByID,
    getAllCustomerOrders,
    getMyOrders
} from '../controllers/order.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const orderRouter: Router = express.Router();

orderRouter.post('/checkout', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    createOrder);

orderRouter.get('/admin/:id',
    verifyToken,
    requireRole('admin'),
    getAllCustomerOrders);

orderRouter.get('/show/:id', 
    verifyToken, 
    requireRole('customer'), 
    getOrderByID);

orderRouter.get('/myOrders',
    verifyToken,
    requireRole('customer'),
    getMyOrders);

export default orderRouter;