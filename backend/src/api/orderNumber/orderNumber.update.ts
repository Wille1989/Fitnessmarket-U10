import { Request, Response } from 'express';
import { OrderNumberfactory } from '../../factories/orderNumber.factory';
import { getDb } from '../../lib/mongodb';
import type { UpdateOrderNumber } from '../../types/product/OrderNumber';
import type { ApiResponse } from '../../types/ApiResponse';

async function updateOrderNumber(req: Request, res: Response<ApiResponse<UpdateOrderNumber>>): Promise<void> {

    const consumerID: string = req.params.id;
    const db = await getDb();
    const orderCollection = db.collection<UpdateOrderNumber>('orders');

    

}

export default updateOrderNumber;