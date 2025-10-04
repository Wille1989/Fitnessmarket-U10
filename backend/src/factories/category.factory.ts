import type { Category, CreateCategory, UpdateCategory } from "../types/product/Category";

export const CategoryFactory = {

    create: (input: CreateCategory): CreateCategory => {
        return {

            title: input.title,
            description: input.description,

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