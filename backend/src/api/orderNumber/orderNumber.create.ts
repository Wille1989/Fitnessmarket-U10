import { Request, Response } from 'express';
import { OrderNumberfactory } from '../../factories/orderNumber.factory';
import type { CreateOrderNumber } from '../../types/product/OrderNumber';
import type { ApiResponse } from '../../types/ApiResponse';
import { getDb } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';


async function createOrderNumber(req: Request, res: Response<ApiResponse<CreateOrderNumber>>): Promise<void> {
    
    const db = await getDb();
    const orderCollection = db.collection<CreateOrderNumber>('orders');
    
    try {

        const newOrder = OrderNumberfactory.create({
            consumerID: new ObjectId(req.params.id),
            content: req.body,
            createdAt: new Date
        });

        const order = await orderCollection.insertOne(newOrder);
        
        res.status(201).json({
            message: 'ordern har skapats',
            data: { ...newOrder, _id: order.insertedId }
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error 
        });
        return;
    };
};

export default createOrderNumber;