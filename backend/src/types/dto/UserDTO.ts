import type { UserRole } from "../enums/UserRole"


export type PublicUserDTO = {
    name: string
}

export type PrivateUserDTO = {
    name: string
    email: string
}

export type AdminUserDTO = {
    id?: string
    createdAt?: Date
    updatedAt?: Date
    createdByAdmin: boolean
    name: string
    email: string
    role: UserRole
}