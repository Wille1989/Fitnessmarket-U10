import type { Order, CreateOrder } from "../types/product/Order"
import { ObjectId } from "mongodb";

export const Orderfactory = {

    create: (data: CreateOrder, customerID: ObjectId, orderNumber: Number ): Order => {
        
        const sumOfOrder = data.content.reduce((total, item) => {
            return total + item.price * item.quantity;
        },0 );

        return {
            sumOfOrder: sumOfOrder,
            customerID: customerID,
            orderNumber: orderNumber,
            content: data.content,
            createdAt: new Date()
        }
    },

    update: (updatedInput: Order): Order => {
        return {
            ...updatedInput,
            updatedAt: new Date
        }
    }
}