import { CreateOrder, ReadOrder } from "../types/product/Order";
import getDb from "../lib/mongodb";
import { Orderfactory } from "../factories/order.factory";

export async function createOrderNumberService(frontendData: CreateOrder): Promise<ReadOrder> {

    const db = await getDb();
    const orderNumberCollection = db.collection<ReadOrder>('orders');

    if(!frontendData.consumerID) {
        throw new Error('Användarens ID kunde inte hittas');
    };
    const newOrder = Orderfactory.create(
        {
            ...frontendData,
        }
    );
    
    const response = await orderNumberCollection.insertOne(newOrder);

    return { ...newOrder, _id: response.insertedId}

}