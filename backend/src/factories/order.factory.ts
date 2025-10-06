import { CreateOrder, UpdateOrder } from "../types/product/Order";

export const Orderfactory = {

    create: (input: CreateOrder): CreateOrder => {
        return {

            consumerID: input.consumerID,
            content: input.content,
            orderNumber: '000000000',
            createdAt: new Date()

        }
    },

    update: (updatedInput: UpdateOrder): UpdateOrder => {
        return {

            ...updatedInput,
            updatedAt: new Date

        }
    }

}