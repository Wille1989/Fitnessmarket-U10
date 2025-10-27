// MAIN OBJECT TYPE
export type Order = {
    _id?: string
    customerID: string
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
    productID: string
    quantity: number
    price: number
    title: string
}