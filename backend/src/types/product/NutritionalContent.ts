import { ObjectId } from "mongodb";

export type NutritionalContent = {
    _id?: ObjectId
    energy: number
    fat: number
    saturatedfat: number
    protein: number
    salt: number
    createdAt?: Date
    updatedAt?: Date
}

export type UpdateNutritionalContent = Partial<{
    _id?: ObjectId
    energy: number
    fat: number
    saturatedFat: number
    protein: number
    salt: number
    updatedAt: Date
}>

export type NutritionalContentComparison = {
    field: keyof NutritionalContent
    productA: number
    productB: number
    comparedData: number
}