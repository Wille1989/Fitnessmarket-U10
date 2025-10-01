import { ObjectId } from "mongodb"
import type { Product } from "./Products"

// MAIN OBJECT TYPE
export type ReadOrder = {
    _id?: ObjectId
    consumerID: ObjectId
    orderNumber: string
    content: ProductItem[]
    createdAt: Date
    updatedAt?: Date
}

// UPDATE
export type UpdateOrder = {
    _id?: ObjectId
    consumerID: ObjectId
    content: Product[]
    updatedAt: Date
}

// CREATE
export type CreateOrder = {
    consumerID: ObjectId
    content: ProductItem[]
    orderNumber: string
    createdAt: Date
}

// PRODUCT ITEM
export type ProductItem = {
    productID: ObjectId
    quantity: number
    price: number
}
