import type { Category } from "./Category"
import type { NutritionalContent } from "./NutritionalContent" 

export type Product = {
    
    _id?: string
    title: string
    price: number
    pricePerKilo: number
    weight: number
    originCountry: string
    customerGroup: string
    category: Category
    nutritionalContent: NutritionalContent

}