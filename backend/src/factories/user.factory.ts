
import { UserRole } from "../types/enums/UserRole";
import type { 
    CreateUser, 
    UpdateUser, 
    UpdateUserByAdmin } 
    from "../types/user/User";

export const UserFactory = {   

    create: (input: CreateUser ): CreateUser => {
        return {

            name: input.name,
            password: input.password,
            email: input.email,
            role: UserRole.consumer,
            createdAt: new Date()

        }
    },

    update: (input: UpdateUser ): UpdateUser => {
        return {

            name: input.name,
            password: input.password,
            email: input.email,
            updatedAt: new Date()

        }
    },

    updateByAdmin: (input: UpdateUserByAdmin): UpdateUserByAdmin => {
        return {

            name: input.name,
            password: input.password,
            email: input.email,
            role: UserRole.consumer || UserRole.retailer || UserRole.superAdmin,
            updatedAt: new Date()

        }
    }

}