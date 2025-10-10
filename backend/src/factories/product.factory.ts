import { ProductRating } from "../types/product/ProductRating";
import type { CreateProduct, Product, UpdateProduct } from "../types/product/Products"


export const ProductFactory = {

    create: (data: 
        { fromBody: CreateProduct, 
            rating: ProductRating
        }): Product => {
            return {         
                title: data.fromBody.title,
                price: data.fromBody.price,
                pricePerKilo: data.fromBody.pricePerKilo,
                weight: data.fromBody.weight,
                originCountry: data.fromBody.originCountry,
                category: data.fromBody.category,
                nutritionalContent: data.fromBody.nutritionalContent,
                rating: data.rating,
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