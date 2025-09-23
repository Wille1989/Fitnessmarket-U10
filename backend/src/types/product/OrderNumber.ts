import { ObjectId } from "mongodb"
import type { Product } from "./Products"

export type OrderNumber = {

    _id?: number
    consumerID: string
    orderNumber: Date
    content: Product
    createdAt: Date
    updatedAt: Date

}

export type CreateOrderNumber = {

    _id?: ObjectId
    consumerID: string
    content: Product
    createdAt: Date

}