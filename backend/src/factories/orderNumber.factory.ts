import { ObjectId } from "mongodb";
import { CreateOrderNumber, OrderNumber, UpdateOrderNumber } from "../types/product/OrderNumber";

export const OrderNumberfactory = {

    create: (input: CreateOrderNumber): CreateOrderNumber => {
        return {

            _id: new ObjectId,
            consumerID: input.consumerID,
            content: input.content,
            createdAt: new Date

        }
    },

    read: (orderInfo: OrderNumber): OrderNumber => {
        return {

            _id: orderInfo._id,
            consumerID: orderInfo.consumerID,
            orderNumber: orderInfo.orderNumber,
            content: orderInfo.content,
            createdAt: orderInfo.createdAt,
            updatedAt: orderInfo.updatedAt

        }
    },

    update: (updatedInput: UpdateOrderNumber): UpdateOrderNumber => {
        return {
            consumerID: updatedInput.consumerID,
            content: updatedInput.content,
            updatedAt: new Date
        }
    }

}