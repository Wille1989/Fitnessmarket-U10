import getDb from "../../lib/mongodb";
import { convertStringToObjectId } from "../../utils/convertData";
import { generateOrderNumber } from '../../utils/generateOrderNumber';
import { NotFoundError } from "../../classes/ErrorHandling";
import { Orderfactory } from "../../factories/order.factory";
import type { Order, ProductItem } from "../../types/product/Order";

// CREATE ORDER
export async function createOrderService(id: string, content: ProductItem[] ): Promise<Order> {
    
    const db = await getDb();
    
    const customerID = convertStringToObjectId(id);

    const newOrderNumber: Number = await generateOrderNumber()

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

export async function deleteOrderByAdminService(costumerID: string, orderID: string) {

    const convertedCostumerID = convertStringToObjectId(costumerID);
    const convertedOrderID = convertStringToObjectId(orderID);

    const db = await getDb();
    const theUser = await db.collection('orders')
    .findOne(convertedCostumerID);

    const theOrder = await db.collection('orders')
    .findOneAndDelete({ costumerID: theUser, _id: convertedOrderID })

    if(!theOrder) {
        throw new NotFoundError('Något gick fel');
    }

    if(theOrder.deletecount === 0){
        throw new NotFoundError('Dokumentet togs inte bort');
    }

    return theOrder;
}

// GET ORDER BY ID (CONFIRMED WOKRING WITH INSOMNIA)
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

    const orders = await db.collection<Order>('users')
    .find({ customerID: userID }).toArray();

    if(orders.length === 0){
        throw new NotFoundError('Inga dokument kunde retuneras');
    }

    return orders;
};