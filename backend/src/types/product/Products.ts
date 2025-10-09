import { ObjectId } from "mongodb"
import { NutritionalContent } from "./NutritionalContent"
import { Category } from "./Category"
import type { NutritionalContentComparison } from "./NutritionalContent"
import type { ProductRating } from "./ProductRating"

export type Product = {
    
    _id?: ObjectId
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    rating: ProductRating
    category: Category
    quantity?: number
    nutritionalContent: NutritionalContent
    createdAt: Date

}

export type CreateProduct = {
    
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    category: Category
    nutritionalContent: NutritionalContent

}

export type UpdateProduct = Partial<{
    
    _id?: ObjectId
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: ObjectId
    nutritionalContent: ObjectId
    updatedAt: Date

}>;

export type ComparedProducts = {
    comparedProducts: string []
    comparison: NutritionalContentComparison[]
}