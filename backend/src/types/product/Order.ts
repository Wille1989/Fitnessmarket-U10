import { ObjectId } from "mongodb"

// MAIN OBJECT TYPE
export type Order = {
    _id?: ObjectId
    customerID: ObjectId
    orderNumber: Number
    content: ProductItem[]
    sumOfOrder: Number
    createdAt?: Date
    updatedAt?: Date
}

// CREATE
export type CreateOrder = {
    content: ProductItem[]
}

// PRODUCT ITEM
export type ProductItem = {
    productID: ObjectId
    quantity: number
    price: number
    title: string
}