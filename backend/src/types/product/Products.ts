import { ObjectId } from "mongodb"
import { CreateNutritionalContent } from "./NutritionalContent"
import { CreateCategory } from "./Category"

export type Product = {
    
    _id?: ObjectId
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: ObjectId
    nutritionalContent: ObjectId

}

export type CreateProduct = {
    
    _id?: ObjectId
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: CreateCategory
    nutritionalContent: CreateNutritionalContent

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