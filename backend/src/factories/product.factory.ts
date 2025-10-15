import { ProductRating } from "../types/product/ProductRating";
import type { CreateProduct, Product, UpdateProduct } from "../types/product/Products"
import { NutritionalContentFactory } from "./nutritionalContent.factory";

export const ProductFactory = {

    create: (fromBody: CreateProduct, rating: ProductRating
        ): Product => {
            return {         
                title: fromBody.title,
                price: fromBody.price,
                weight: fromBody.weight,
                originCountry: fromBody.originCountry,
                category: fromBody.category,
                nutritionalContent: NutritionalContentFactory.create(
                    fromBody.nutritionalContent),
                rating: rating,
                createdAt: new Date(),    
            }
        },

    update: (current: Product, changes: UpdateProduct): Product => {
        return {
            ...current,
            ...changes,
            updatedAt: new Date,
        }
    },
};