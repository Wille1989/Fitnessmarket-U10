import { ObjectId } from "mongodb"

// MAIN OBJECT TYPE
export type Order = {
    _id?: ObjectId
    customerID: ObjectId
    orderNumber: OrderNumberCounter
    content: ProductItem[]
    createdAt: Date
    updatedAt?: Date

}

// CREATE
export type CreateOrder = {
    content: ProductItem[]
    createdAt: Date
}

// PRODUCT ITEM
export type ProductItem = {
    productID: ObjectId
    quantity: number
    price: number
}

export type OrderNumberCounter = {
    currentOrderNumber: number
    newOrderNumber: number
}