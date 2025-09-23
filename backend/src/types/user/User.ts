
import { UserRole } from "../enums/UserRole"

export type User = {

    _id?: string
    name: string
    password: string
    email: string
    role: UserRole
    createdAt: Date
    updatedAt: Date

}

export type CreateUser = {

    _id?: string
    name: string
    password: string
    email: string
    role: UserRole
    createdAt: Date

}

export type UpdateUserByAdmin = {

    name?: string
    password?: string
    email?: string
    role?: UserRole
    updatedAt?: Date

}

export type UpdateUser = {

    name?: string
    password?: string
    email?: string
    updatedAt?: Date

}
