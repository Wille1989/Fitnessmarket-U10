import { Response } from 'express';
import { ValidationError, AppError } from '../classes/ErrorHandling';
import type { ApiResponse } from "../types/ApiResponse";
import type { Order } from "../types/product/Order";
import type { AuthenticatedRequest } from '../types/user/UserAuth';
import { 
    createOrderService,
    getOrderByIdService,
    getAllOrdersService,
} from '../services/order/order.service';

// CREATE ORDER
export async function createOrder(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order>>): Promise<void>{
    try {
        const role = req.user!.role; 

        if(role === 'sales'){
            throw new ValidationError('Endast admin och customer kan lägga en order');

        } else if (role === 'admin' || role === 'customer'){   

            const { content } = req.body;
            const customerID = req.user!.userID

            const result = await createOrderService(customerID, content);

            res.status(201).json({ message: 'Ordern har skapats', data: result });
        }

    } catch (error) {
        const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// GET ORDER BY ID
export async function getOrderByID(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order>>): Promise<void> {
    try {
        const user = req.user;

        if(user?.role === 'costumer'){
            const userID = user.userID;
            const orderID = req.params.id;

            const result = await getOrderByIdService(userID, orderID);

            res.status(200).json({ 
                message: `order:${result.orderNumber} hittades och retuneras`, data: result });

        } else if (user?.role === 'admin'){
            const costumerID = req.body.id;
            const orderID = req.body.orderID;

            const result = await getOrderByIdService(costumerID, orderID);

            res.status(200).json(({ 
                message: `order:${result.orderNumber} för kund ID:${result.customerID} hittades och retuneras`,
                data: result }));
        }

    } catch (error) {
        const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

export async function getAllCustomerOrders(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order[]>>): Promise<void> {
        try {
            const { id } = req.params;

            const result = await getAllOrdersService(id);

            res.status(200).json({ message: `Du har ${result.length} ordrar:`, data: result });
            
        } catch (error) {
            const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
        }
}

// GET ALL ORDERS FOR A USER
export async function getMyOrders(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order[]>>): Promise<void> {
        try {
            const userID = req.user!.userID;

                const result = await getAllOrdersService(userID);

                res.status(200).json({ message: `Du har ${result.length} ordrar:`, data: result });
         
        } catch (error) {
            const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
}