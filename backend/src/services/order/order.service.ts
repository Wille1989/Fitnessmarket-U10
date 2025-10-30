import getDb from "../../lib/mongodb";
import { convertStringToObjectId } from "../../utils/convertData";
import { generateOrderNumber } from '../../utils/generateOrderNumber';
import { NotFoundError } from "../../classes/ErrorHandling";
import { Orderfactory } from "../../factories/order.factory";
import type { Order, ProductItem } from "../../types/product/Order";
import { ValidationError } from "../../classes/ErrorHandling";

// CREATE ORDER
export async function createOrderService(id: string, content: ProductItem[] ): Promise<Order> {
    
    const db = await getDb();
    
    const customerID = convertStringToObjectId(id);

    const newOrderNumber: Number = await generateOrderNumber();

    if (!Array.isArray(content) || content.length === 0) {
        throw new ValidationError("Ordern måste innehålla minst en produkt");
    }

    const newOrder = Orderfactory.create({ content }, customerID, newOrderNumber);
    const response = await db.collection<Order>('orders').insertOne(newOrder);

    return { ...newOrder, _id: response.insertedId }
};

// DELETE ORDER
export async function deletOrderService(id: string ) {

    const orderID = convertStringToObjectId(id);

    const db = await getDb();

    const myOrder = await db.collection('orders')
    .findOneAndDelete({ _id: orderID })

    if(!myOrder) {
        throw new NotFoundError('Användaren hittades inte');
    }
    
    if(myOrder.deletedCount === 0) {
        throw new NotFoundError('Ordern har inte tagits bort');
    }

    return myOrder;

};

// GET ORDER BY ID
export async function getOrderByIdService(userID: string, orderID: string): Promise<Order> {

    const convertedUserID = convertStringToObjectId(userID);
    const convertedOrderID = convertStringToObjectId(orderID);

    const db = await getDb();
    const theOrder = await db.collection<Order>('orders')
    .findOne({ customerID: convertedUserID, _id: convertedOrderID });

    if(!theOrder) {
        throw new Error('Inget dokument hittades');
    };

    return theOrder;

};

// GET ALL ORDERS FOR A USER
export async function getAllOrdersService(id: string): Promise<Order[]>{

    const userID = convertStringToObjectId(id);
    const db = await getDb();


    const orders = await db.collection<Order>('orders')
    .find({ customerID: userID }).toArray();

    return orders;
};