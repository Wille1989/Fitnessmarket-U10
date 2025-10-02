
import type { CreateProduct, Product, UpdateProduct } from "../types/product/Products"
import { CategoryFactory } from "./category.factory"
import { NutritionalContentFactory } from "./nutritionalContent.factory"


export const ProductFactory = {

    create: (input: CreateProduct): Product => {
        return {
            
            title: input.title || '',
            price: input.price || 0,
            pricePerKilo: input.pricePerKilo || 0,
            weight: input.weight || 0,
            originCountry: input.originCountry || 'okänd',
            customerGroup: input.customerGroup || 'alla',
            category: CategoryFactory.create(input.category),
            nutritionalContent: NutritionalContentFactory.create(input.nutritionalContent),
            createdAt: new Date()

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
