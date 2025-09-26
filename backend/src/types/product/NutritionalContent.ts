import { ObjectId } from "mongodb";

export type NutritionalContent = {

    _id?: ObjectId
    energy: string
    fat: string
    saturatedFat: string
    protein: string
    salt: string

}