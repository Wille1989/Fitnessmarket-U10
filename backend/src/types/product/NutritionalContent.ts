import { ObjectId } from "mongodb";

export type NutritionalContent = {

    _id?: ObjectId
    energy: number
    fat: number
    saturatedfat: number
    protein: number
    salt: number

}

export type CreateNutritionalContent = {

    energy: number
    fat: number
    saturatedfat: number
    protein: number
    salt: number

}

export type UpdateNutritionalContent = Partial<{

    _id?: ObjectId
    energy: string
    fat: string
    saturatedFat: string
    protein: string
    salt: string
    updatedAt: Date

}>

export type NutritionalContentComparison = {

    field: keyof NutritionalContent
    productA: number
    productB: number
    comparedData: number
    
}