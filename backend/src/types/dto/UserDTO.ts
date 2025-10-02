import type { UserRole } from "../enums/UserRole"


export type PublicUserDTO = {
    id?: string
    name: string
}

export type PrivateUserDTO = {
    id?: string
    name: string
    email: string
}

export type AdminUserDTO = {
    id?: string
    name: string
    email: string
    userRole: UserRole,
    createdAt: string,
    updatedAt?: string
}