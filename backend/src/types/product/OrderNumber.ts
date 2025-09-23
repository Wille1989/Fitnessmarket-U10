import type { Product } from "./Products"

export type OrderNumber = {

    _id?: number
    orderNumber: number
    content: Product
    createdAt: Date
    updatedAt: Date

}