import { ObjectId } from "mongodb"
import type { CreateOrder, Order, OrderNumberCounter, ProductItem } from "../types/product/Order"

export const Orderfactory = {

    create: (input: { 
        customerID: ObjectId
        orderNumber: OrderNumberCounter
        content: ProductItem[]
        createdAt: Date
        } ): Order => {
        return {
            customerID: input.customerID,
            orderNumber: input.orderNumber,
            content: input.content,
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