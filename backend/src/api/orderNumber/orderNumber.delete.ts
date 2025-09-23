import { Request, Response } from 'express';
import type { OrderNumber } from '../../types/product/OrderNumber';
import { getDb } from '../../lib/mongodb';
import { OrderNumberfactory } from '../../factories/orderNumber.factory';
import type { ApiResponse } from '../../types/ApiResponse';

async function showOrderNumbers(req: Request, res: Response<ApiResponse<OrderNumber[]>>): Promise<void> {

    const orderNumberID = req.params.id;
    const db = await getDb();
    const orderCollection = db.collection<OrderNumber | OrderNumber[]>('orders');

    try {

        const allOrders = await orderCollection.deleteOne(orderNumberID)

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

export default showOrderNumbers;