import { Category } from "./Category"
import type { NutritionalContent } from "./NutritionalContent"

export type Product = {
    
    _id: string
    title: string
    price: number
    weight: number
    originCountry: string
    rating: ProductRating
    category: Category
    nutritionalContent: NutritionalContent
    createdAt?: Date
    updatedAt?: Date

}

export type ProductRating = {
    average: number
    sum: number
    totalRatings: number
}