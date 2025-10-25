import { UserRole } from "../enums/UserRoles"

export type User = {
    id: string
    name: string
    email: string
    password: string
    role: UserRole
}

export type UpdateUser = Partial<{
    id: string
    name: string
    email: string
    password: string
    role: string
}>

export type CreateUser = {
    email: string
    password: string
}
