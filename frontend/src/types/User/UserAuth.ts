import type { User } from "./User"

export type Logindata = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    user: User
}