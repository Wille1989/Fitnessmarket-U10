import { ObjectId } from "mongodb"
import { CreateNutritionalContent, NutritionalContent } from "./NutritionalContent"
import { CreateCategory, Category } from "./Category"

export type Product = {
    
    _id?: ObjectId
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: Category
    nutritionalContent: NutritionalContent
    createdAt: Date

}

export type CreateProduct = {
    
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: CreateCategory
    nutritionalContent: CreateNutritionalContent
    createdAt: Date

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