import { ObjectId } from "mongodb"
import type { Product } from "./Products"

// MAIN OBJECT TYPE
export type OrderNumber = {

    _id?: ObjectId
    consumerID: ObjectId
    orderNumber: Date
    content: Product[]
    createdAt: Date
    updatedAt: Date

}

// CREATE
export type CreateOrderNumber = {

    _id?: ObjectId
    consumerID: ObjectId
    content: Product[]
    createdAt: Date

}

// EXPORT
export type UpdateOrderNumber = {

    _id?: ObjectId
    consumerID: ObjectId
    content: Product[]
    updatedAt: Date

}