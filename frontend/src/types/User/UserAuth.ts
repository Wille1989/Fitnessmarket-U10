import type { User } from "./User"

export type LoginData = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    user: User
}