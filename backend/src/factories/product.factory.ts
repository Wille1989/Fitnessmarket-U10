import type { Product } from "../types/product/Products"
import { CategoryObject } from "./category.object"
import { NutritionalContentObject } from "./nutritionalContent.object"

export const ProductFactory = (overrides?: Partial<Product>): Product => ({

    title: '',
    price: 0,
    pricePerKilo: 0,
    weight: 0,
    originCountry: '',
    customerGroup: '',
    category: { ...CategoryObject },
    nutritionalContent: { ...NutritionalContentObject },
    ...overrides

});
