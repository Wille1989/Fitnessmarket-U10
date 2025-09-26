import { ObjectId } from "mongodb";

export type Category = {

    _id?: ObjectId
    title: string
    description: string
    createdAt?: Date 

}

export type UpdateCategory = Partial<{

    _id?: ObjectId
    title: string
    description: string
    updatedAt: Date

}>