import { Response } from 'express';
import { ValidationError, AppError } from '../classes/ErrorHandling';
import type { ApiResponse } from "../types/ApiResponse";
import type { Order } from "../types/product/Order";
import type { AuthenticatedRequest } from '../types/user/UserAuth';
import { 
    createOrderService,
    deletOrderService, 
    getOrderByIdService,
    getAllOrdersService,
    deleteOrderByAdminService
} from '../services/order/order.service';

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
        const user = req.user;
        
        if(user?.role === 'admin') {
            const customerOrderID = req.params.id;
            const customerID = req.body;

            await deleteOrderByAdminService(customerOrderID, customerID);

            res.status(200).json({ message: 'Tog bort kundens order', data: null });

        } else if (user?.role === 'customer'){
            const orderID = req.params.id;

            await deletOrderService(orderID);

            res.status(200).json({ 
                message: `din order har tagits bort`, data: null });
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

// GET ALL ORDERS FOR A USER
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