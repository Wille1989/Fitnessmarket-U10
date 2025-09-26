import { ObjectId } from "mongodb";
import type { Category, UpdateCategory } from "../types/product/Category";

export const CategoryFactory = {

    create: (input: Category): Category => {
        return {

            _id: new ObjectId,
            title: input.title || 'Ingen kategori vald',
            description: input.description || 'Beskrivning saknas',
            createdAt: new Date

        }
    },

    read: (orderInfo: Category): Category => {
        return {

            ...orderInfo

        }
    },

    update: (changes: UpdateCategory): UpdateCategory => {
        return {

            ...changes,
            updatedAt: new Date

        }
    }
    

};