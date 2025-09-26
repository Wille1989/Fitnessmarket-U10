
import type { Product, UpdateProduct } from "../types/product/Products"
import { CategoryFactory } from "./category.factory"
import { NutritionalContentObject } from "./nutritionalContent.object"


export const ProductFactory = {

    create: (input: Partial<Product>): Product => {
        return {
            
            title: input.title || '',
            price: input.price || 0,
            pricePerKilo: input.pricePerKilo || 0,
            weight: input.weight || 0,
            originCountry: input.originCountry || 'okänd',
            customerGroup: input.customerGroup || 'alla',
            category: CategoryFactory.read() || 'inte specificerat',
            nutritionalContent: { ...NutritionalContentObject || 'inte angivit' },

        }
    },

    read: (orderInfo: Product): Product => {
        return {

            ...orderInfo,
            
        }
    },

    update: (changes: UpdateProduct): UpdateProduct => {
        return {

            ...changes,
            updatedAt: new Date,
            
        }
    },

}
