import { ObjectId } from "mongodb"
import { UserRole } from "../enums/UserRole"

// MAIN OBJECT USER
export type User = {
    _id?: ObjectId
    createdAt?: Date
    updatedAt?: Date
    role: UserRole
    name: string
    password: string
    email: string
}

// CREATE USER
export type CreateUser = {
    role: UserRole
    name: string
    password: string
    email: string
}

// ADMIN
export type UpdateUserByAdmin = Partial<{
    updatedAt: Date
    role: UserRole
    name: string
    password: string
    email: string
}>

// UPDATE USER
export type UpdateUser = Partial<{
    updatedAt: Date
    role: UserRole
    name: string
    password: string
    email: string
}>
