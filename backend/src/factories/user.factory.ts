import { UserRole } from "../types/enums/UserRole";
import type { CreateUser, UpdateUser, UpdateUserByAdmin } from "../types/user/User";

export const UserFactory = {   

    create: (input: CreateUser ): CreateUser => {
        return {

            name: input.name || 'Användare',
            password: input.password,
            email: input.email,
            role: UserRole.customer,
            createdAt: new Date()

        }
    },

    update: (changes: UpdateUser ): UpdateUser => {
        return {

            ...changes,
            updatedAt: new Date()

        }
    },

    updateByAdmin: (changes: UpdateUserByAdmin): UpdateUserByAdmin => {
        return {

            ...changes,
            role: UserRole.customer || UserRole.sales || UserRole.admin,
            updatedAt: new Date()

        }
    }

};