import { ObjectId } from "mongodb"
import type { Product } from "./Products"

// MAIN OBJECT TYPE
export type OrderNumber = {

    _id?: ObjectId
    consumerID: string
    orderNumber: Date
    content: Product[]
    createdAt: Date
    updatedAt: Date

}

// CREATE
export type CreateOrderNumber = {

    _id?: ObjectId
    consumerID: string
    content: Product[]
    createdAt: Date

}

// EXPORT
export type UpdateOrderNumber = {

    _id?: ObjectId
    consumerID: string
    content: Product[]
    updatedAt: Date

}