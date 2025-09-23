import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../../lib/mongodb';
import type { OrderNumber } from '../../types/product/OrderNumber';
import type { ApiResponse } from '../../types/ApiResponse';

async function deleteOrderNumber(req: Request, res: Response<ApiResponse<OrderNumber>>): Promise<void> {

    const db = await getDb();
    const orderCollection = db.collection<OrderNumber>('orders');

    try {

        const deleteOrder = await orderCollection.deleteOne({ _id: new ObjectId (req.params.id) });

        if(deleteOrder.deletedCount === 0) {
            res.status(400).json({ 
                message: 'Ordern togs inte bort',
            });

        };

        res.status(200).json({
            message: 'Ordern är nu borttagen'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
        });
    };
};

export default deleteOrderNumber;