import { ProductRating } from "../types/product/ProductRating";
import type { CreateProduct, Product, UpdateProduct } from "../types/product/Products"


export const ProductFactory = {

    create: (data: 
        { fromBody: CreateProduct, 
            rating: ProductRating, 
            createdAt: Date 
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
                createdAt: data.createdAt,    
            }
        },

    update: (changes: UpdateProduct): UpdateProduct => {
        return {

            ...changes,
            updatedAt: new Date,
            
        }
    },
};