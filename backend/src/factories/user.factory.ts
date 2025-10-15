import { UserRole } from "../types/enums/UserRole";
import type { CreateUser, UpdateUser, UpdateUserByAdmin, User } from "../types/user/User";

export const UserFactory = {   

    create: (data: CreateUser, createdByAdmin = false ): User => {
        return {
            name: data.name || 'Användare',
            password: data.password,
            email: data.email,
            createdByAdmin, 
            role: UserRole.customer,
            createdAt: new Date()
        }
    },

    update: (current: User, changes: UpdateUser ): User => {
        return {
            ...current,
            ...changes,
            updatedAt: new Date()
        }
    },

    updateByAdmin: (current: User, changes: UpdateUserByAdmin): User => {
        return {
            ...current,
            ...changes,
            role: UserRole.customer || UserRole.sales || UserRole.admin,
            updatedAt: new Date()
        }
    }
};