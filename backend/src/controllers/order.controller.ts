import { Request, Response } from 'express';
import type { ApiResponse } from "../types/ApiResponse";
import type { Order } from "../types/product/Order";
import { 
    createOrderService,
    deletOrderService, 
    getOrderByIdService,
    getAllOrdersService,
    deleteOrderByAdminService
} from '../services/order/order.service';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { ValidationError } from '../classes/ErrorHandling';
import { AppError } from '../classes/ErrorHandling';

// CREATE ORDER
export async function createOrder(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order>>): Promise<void>{
    try {
        const costumerRole = req.user!.role; 

        if(costumerRole === 'sales'){
            throw new ValidationError('Endast admin och customer kan lägga en order');

        } else if (costumerRole === 'admin' || costumerRole === 'customer'){   

            // grab the entire order object sent from frontend
            const { content } = req.body;
            const customerID = req.user!.userID
            // Sending the userID and the order object to service
            const result = await createOrderService(customerID, content);

            res.status(201).json({ message: 'Ordern har skapats', data: result });
        }

    } catch (error) {
        const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK ORDER:');
            console.error('Name:', err.name);
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

// DELETE ORDER
export async function deleteOrder(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> { 
    try {
        const userRole = req.user!.role;
        const orderID = req.body.order;

        if(userRole === 'admin') {
            const costumerID = req.body.user;

            await deleteOrderByAdminService(costumerID, orderID);

            res.status(200).json({ message: 'Tog bort kundens order!', data: null });

        } else if (userRole === 'costumer'){
            const costumerID = req.body._id;
            const userID = req.user!.userID;
            const userName = req.body.name;

            await deletOrderService(userID, costumerID);

            res.status(200).json({ 
                message: `${userName.name}, din order har tagits bort`, data: null });
        }
        
    } catch (error) {
        const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK ORDER:');
            console.error('Name:', err.name);
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

// GET ORDER OR ORDERS
export async function getOrderByID(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order>>): Promise<void> {
    try {
        const user = req.user;
        const order = req.body;

        if(user?.role === 'costumer'){
            const userID = user.userID;
            const orderID = order.orderID;

            const result = await getOrderByIdService(userID, orderID);

            res.status(200).json({ 
                message: `order:${result.orderNumber} hittades och retuneras`, data: result });

        } else if (user?.role === 'admin'){
            const costumerID = req.body.id;
            const orderID = order.orderID;

            const result = await getOrderByIdService(costumerID, orderID);

            res.status(200).json(({ 
                message: `order:${result.orderNumber} för kund ID:${result.customerID} hittades och retuneras`,
                data: result }));
        }
  
  
    } catch (error) {
        const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK ORDER:');
            console.error('Name:', err.name);
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

export async function getAllOrders(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order[]>>): Promise<void> {
        try {
            const user = req.user;
            const customer = req.body;

            if(user?.role === 'customer'){
                const userID = user.userID;

                const result = await getAllOrdersService(userID);

                res.status(200).json({ message: `Du har ${result.length} ordrar:`, data: result });

            } else if(user?.role === 'admin'){
                const customerID = customer.userID;

                const result = await getAllOrdersService(customerID);

                res.status(200).json({ message: `Kund har ${result.length} ordrar:`, data: result });
            };          

        } catch (error) {
            const err = error as AppError;
        
        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK ORDER:');
            console.error('Name:', err.name);
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