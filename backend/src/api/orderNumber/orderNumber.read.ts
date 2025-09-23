import { Request, Response } from 'express';
import { getDb } from '../../lib/mongodb';
import { OrderNumberfactory } from '../../factories/orderNumber.factory';
import type { OrderNumber } from '../../types/product/OrderNumber';
import type { ApiResponse } from '../../types/ApiResponse';

async function readAllOrderNumbers(req: Request, res: Response<ApiResponse<OrderNumber[]>>): Promise<void> {

    const consumerID: string = req.params.id;
    const db = await getDb();
    const orderCollection = db.collection<OrderNumber>('orders');

    try {

        const orders = await orderCollection.find({ consumerID }).toArray();

        const customerOrders = orders.map(order => OrderNumberfactory.read(order));

        if(customerOrders.length === 0) {
            res.status(400).json({
                message: 'kunden har inga ordrar'
            });

            console.error(customerOrders);
        };

        res.status(200).json({
            message: `antal ordrar hämtade: ${orders.length}`,
            data: customerOrders
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
    
};

export default readAllOrderNumbers;