import { Request, Response } from 'express';
import type { ApiResponse } from "../types/ApiResponse";
import type { Order } from "../types/product/Order";
import type { Product } from '../types/product/Products';
import { getProductByIdService } from '../services/product/product.service';
import { 
    deletOrderService, 
    getOrderByIdService, 
    getOrdersService,
} from '../services/order/order.service';
import { ObjectId } from 'mongodb';

// CREATE ORDER
export async function createOrder(req: Request, res: Response<ApiResponse<Order>>): Promise<void>{
    try {
        const frontendData = req.body;

        if(Object.values(frontendData).some(v => v === null || v === undefined || v === '')){
            res.status(400).json({ message: 'Alla fält måste vara ifyllda' });
            return;
        };

        const products = await Promise.all(frontendData.content.map(async(item: Product) => {
            const product = await getProductByIdService(new ObjectId(item._id));
            if(!product) {
                throw new Error(`Produkt ${item._id} hittades inte`);
            };
            return { ...product, quantity: item.quantity };
        }));

        if (!products || products.length === 0) {
            res.status(400).json({ message: 'Ordern saknar produkter!' });
            return;
        };

        res.status(201).json({ message: 'Ordern har skapats' });

    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
        return;
    };
};

// DELETE ORDER
export async function deleteOrder(req: Request, res: Response<ApiResponse<null>>): Promise<void> { 
    try {
        const { id } = req.params;
        const orderID = new ObjectId(id);

        if(!ObjectId.isValid( id )) {
        throw new Error('Kunde inte verifiera ID');
        };

        await deletOrderService(orderID);

        res.status(200).json({ message: 'Ordern har tagits bort' });
        
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
        return;
    };
};

// GET ORDER OR ORDERS
export async function getOrder(req: Request, res: Response<ApiResponse<Order | Order []>>): Promise<void> {
    try {
        const { id } = req.params;
    
        if(id) {

            if(!ObjectId.isValid(id)) {
                res.status(400).json({ message: 'ogiltigt format' });
                return;
            };

            const orderID = new ObjectId(req.params.id);
            const order = await getOrderByIdService(orderID);

            res.status(200).json({ 
                message: `order med ID:${orderID} hämtad`, 
                data: order });
            
        } else {
            const orders = await getOrdersService();
            res.status(200).json({
                message: `Ordrar hämtade!`,
                data: orders });
        };
        
    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    };
};