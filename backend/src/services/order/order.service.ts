import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { Orderfactory } from "../../factories/order.factory";
import type { 
    CreateOrder, 
    Order, 
    OrderNumberCounter,
    ProductItem
} from "../../types/product/Order";


// CREATE ORDER
export async function createOrderService(customerID: ObjectId, content: ProductItem[], orderNumber: OrderNumberCounter ): Promise<Order> {
    const db = await getDb();
    const orderNumberCollection = db.collection<Order>('orders');

        const newOrder = Orderfactory.create({
            customerID: customerID,
            orderNumber: orderNumber,
            content: content,
            createdAt: new Date(),
            });
    
    const response = await orderNumberCollection.insertOne(newOrder);

    return { ...newOrder, _id: response.insertedId }
};

export async function deletOrderService(customerID: ObjectId, orderID: ObjectId ) {
    const db = await getDb();
    const orderCollection = db.collection('orders');

    const result = await orderCollection.deleteOne({ customerID, orderID });

    if(result.deletedCount === 0) {
        throw new Error('Ordern togs inte bort');
    };

    return result;

};

export async function getOrderByIdService(customerID: ObjectId, orderID: ObjectId): Promise<Order> {

    const db = await getDb();
    const orderCollection = db.collection<Order>('orders');

    const result = await orderCollection.findOne({ customerID, orderID });

    if(!result) {
        throw new Error('Inget dokument hittades');
    };

    return result;

};

export async function getOrdersForUserService(orderID: ObjectId, customerID: ObjectId): Promise<Order[]>{

    const db = await getDb();
    const orderCollection = db.collection<Order>('orders');

    const result = await orderCollection.find({ orderID, customerID }).toArray();

    if(!result) {
        throw new Error('Inget dokument hittades');
    };

    return result;
};