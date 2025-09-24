import type { Product } from "../types/product/Products"
import { CategoryObject } from "./category.object"
import { NutritionalContentObject } from "./nutritionalContent.object"

export const ProductFactory = {

    create: (input: Partial<Product>, overrides?: Partial<Product>): Product => {

        return {
            
            title: input.title || '',
            price: input.price || 0,
            pricePerKilo: input.pricePerKilo || 0,
            weight: input.weight || 0,
            originCountry: input.originCountry || 'okänd',
            customerGroup: input.customerGroup || 'alla',
            category: { ...CategoryObject || 'inte specificerat' },
            nutritionalContent: { ...NutritionalContentObject || 'inte angivit' },
            ...overrides

        }
    }
}
