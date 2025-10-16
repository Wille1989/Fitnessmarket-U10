import type { User } from "./User"

export type LoginData = {
    email: string
    password: string
}

export type LoginResponse = {
    data: {
        token: string
        user: User
    }
}

export type AuthTokenPayload = {
    userID: string
    email: string
    role: 'admin' | 'sales' | 'customer'
    exp: number
    iat: number
}