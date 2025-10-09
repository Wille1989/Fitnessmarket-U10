import express from 'express';
import { Router } from 'express';
import { 
    createOrder,
    deleteOrder,
    getOrderByID,
    getOrdersForUser,
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

orderRouter.get('/show/:id', 
    verifyToken, 
    requireRole('customer', 'admin'), 
    getOrderByID);

orderRouter.get('/index',
    verifyToken,
    requireRole('customer'),
    getOrdersForUser);

/* ADMIN SPECIFIK ROUTES
orderRouter.get('/admin/order/all', 
    verifyToken, 
    requireRole('admin'), 
    getOrder);*/

export default orderRouter;