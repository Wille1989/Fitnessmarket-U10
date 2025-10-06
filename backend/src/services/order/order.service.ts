import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Orderfactory } from "../../factories/order.factory";
import type { 
    CreateOrder, 
    Order 
} from "../../types/product/Order";


// CREATE ORDER
export async function createOrderService(frontendData: CreateOrder): Promise<Order> {
    const db = await getDb();
    const orderNumberCollection = db.collection<Order>('orders');

    if(!frontendData.consumerID) {
        throw new Error('Användarens ID kunde inte hittas');
    };

    const newOrder = Orderfactory.create({
            ...frontendData,
            createdAt: new Date() });
    
    const response = await orderNumberCollection.insertOne(newOrder);

    return { ...newOrder, _id: response.insertedId }

};

export async function deletOrderService( id: ObjectId ) {
    const db = await getDb();
    const orderCollection = db.collection('orders');

    const result = await orderCollection.deleteOne({ _id: id });

    if(result.deletedCount === 0) {
        throw new Error('Ordern togs inte bort');
    };

    return result;

};

export async function getOrderByIdService( id: ObjectId ): Promise<Order> {

    const db = await getDb();
    const orderCollection = db.collection<Order>('orders');

    const result = await orderCollection.findOne({ _id: id });

    if(!result) {
        throw new Error('Inget dokument hittades');
    };

    return result;

};

export async function getOrdersService(): Promise<Order[]>{

    const db = await getDb();
    const orderCollection = db.collection<Order>('orders');

    const result = await orderCollection.find({}).toArray();

    if(!result) {
        throw new Error('Inget dokument hittades');
    };

    return result;
};