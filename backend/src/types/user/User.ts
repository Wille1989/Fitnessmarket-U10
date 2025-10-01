import { ObjectId } from "mongodb"
import { UserRole } from "../enums/UserRole"

export type User = {

    _id?: ObjectId
    name: string
    password: string
    email: string
    role: UserRole
    createdAt: Date
    updatedAt?: Date

}

export type CreateUser = {

    _id?: ObjectId
    name: string
    password: string
    email: string
    role: UserRole
    createdAt: Date

}

export type UpdateUserByAdmin = {

    name?: ObjectId
    password?: string
    email?: string
    role?: UserRole
    updatedAt?: Date

}

export type UpdateUser = Partial<{

    name: string
    password: string
    email: string
    updatedAt: Date

}>
