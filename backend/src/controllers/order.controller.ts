import { Request, Response } from 'express';
import type { ApiResponse } from "../types/ApiResponse";
import type { Order } from "../types/product/Order";
import { 
    createOrderService,
    deletOrderService, 
    getOrderByIdService,
    getOrdersForUserService,
} from '../services/order/order.service';
import { ObjectId } from 'mongodb';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { validateUserId } from '../validators/user/user.validate';
import { ValidationError } from '../classes/ErrorHandling';
import { AppError } from '../classes/ErrorHandling';

// CREATE ORDER
export async function createOrder(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order>>): Promise<void>{
    try {
        // User validation with Token, 
        // store userID for connection between order and user
        const customerID = validateUserId(req.user!.userID);

        // grab the entire order object from frontend
        const orderData = req.body.order;

        // Check that inputs contains value
        if(Object.values(orderData).some(v => v === null || v === undefined || v === '')){
            res.status(400).json({ message: 'Valideringsfel, något fält är tomt' });
            return;
        };

        // Sending the userID and the order object to service
        const result = await createOrderService(customerID, orderData, orderData.orderNumberCounter);

        res.status(201).json({ message: 'Ordern har skapats' });

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
        const customerID = validateUserId(req.user!.userID);
        const { _id } = req.body.order;

        if(!ObjectId.isValid(_id)) {
        throw new Error('Kunde inte verifiera ID');
        };

        const orderID = new ObjectId(String(_id));

        await deletOrderService(customerID, orderID);

        res.status(200).json({ message: 'Ordern har tagits bort' });
        
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
        const customerID = validateUserId(req.user!.userID);
        const { _id } = req.body.order;

        if(!ObjectId.isValid(_id)){
            throw new ValidationError('Orderns ID är inte giltig');
        };

        const orderID = new ObjectId(String(_id));

        const order = await getOrderByIdService(customerID, orderID);

        res.status(200).json({ 
            message: `order med ID:${orderID} hämtad`, 
            data: order });
  
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

export async function getOrdersForUser(
    req: AuthenticatedRequest, res: Response<ApiResponse<Order[]>>): Promise<void> {
        try {
            const customerID = validateUserId(req.user!.userID);
            const order = req.body.order;
            
            if(!ObjectId.isValid(order._id)){
                throw new ValidationError('Orderns ID är inte giltig')};

            const orderID = new ObjectId(String(order._id));

            const orders = await getOrdersForUserService(orderID, customerID);

            res.status(200).json({ message: `${orders.length} ordrar retunerades!`, data: orders });

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