import type { Order } from "../types/product/Order";
import getDb from "../lib/mongodb";

export async function generateOrderNumber(): Promise<number> {

    const db = await getDb();
    const orderCollection = db.collection<Order>('orders');

    const lastOrder = await orderCollection.find()
    .sort({ orderNumber: -1 })
    .limit(1)
    .next();

    const nextOrderNumber = lastOrder ? Number(lastOrder.orderNumber) + 1 : 10000;

    return nextOrderNumber;
};