import { OrderNumber } from "../types/product/OrderNumber";
import { Product } from "../types/product/Products";
import { ProductFactory } from "./product.factory";

const product: Product = ProductFactory();

export const OrderNumberObject: OrderNumber = {

    orderNumber: 0,
    content: product,
    createdAt: new Date(),
    updatedAt: new Date()

};