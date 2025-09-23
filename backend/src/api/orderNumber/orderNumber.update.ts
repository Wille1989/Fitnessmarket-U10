import { Request, Response } from 'express';
import { OrderNumberfactory } from '../../factories/orderNumber.factory';
import { getDb } from '../../lib/mongodb';
import type { UpdateOrderNumber } from '../../types/product/OrderNumber';
import type { ApiResponse } from '../../types/ApiResponse';
import { ObjectId } from 'mongodb';

async function updateOrderNumber(req: Request, res: Response<ApiResponse<UpdateOrderNumber>>): Promise<void> {

    const db = await getDb();
    const orderCollection = db.collection<UpdateOrderNumber>('orders');
    const savedOrder = OrderNumberfactory.update(req.body);

    try {

        const updateOrder = await orderCollection.findOneAndUpdate(
            { _id: new ObjectId (req.params.id) },
            { $set: savedOrder },
            { returnDocument: 'after' }
        )

        if(updateOrder === null) {
            res.status(400).json({ 
                message: 'Kunde inte ladda ordern'
            });
            console.error(updateOrder);
            return;
        };

        res.status(200).json({
            message: 'Ordern har uppdaterats!',
            data: updateOrder
         });

        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
  
}

export default updateOrderNumber;