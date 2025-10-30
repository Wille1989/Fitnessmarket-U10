import { ObjectId } from "mongodb"
import { NutritionalContent } from "./NutritionalContent"
import type { NutritionalContentComparison } from "./NutritionalContent"
import type { ProductRating } from "./ProductRating"

export type Product = {
    
    _id?: ObjectId
    title: string
    price: number
    weight: number
    originCountry: string
    rating: ProductRating
    nutritionalContent: NutritionalContent
    imageUrl: string
    createdAt?: Date
    updatedAt?: Date

}

export type CreateProduct = {
    
    title: string
    price: number
    weight: number
    imageUrl: string
    originCountry: string
    nutritionalContent: NutritionalContent

}

export type UpdateProduct = Partial<{
    
    _id?: ObjectId
    title: string
    price: number
    weight: number
    imageUrl: string
    originCountry: string
    rating: ProductRating
    nutritionalContent: NutritionalContent
    updatedAt: Date

}>;

export type ComparedProducts = {
    comparedProducts: string []
    comparison: NutritionalContentComparison[]
}