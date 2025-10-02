
import { UserRole } from "../types/enums/UserRole";
import type { 
    CreateUser, 
    UpdateUser, 
    UpdateUserByAdmin,
} from "../types/user/User";

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

    update: (changes: UpdateUser ): UpdateUser => {
        return {

            ...changes,
            updatedAt: new Date()

        }
    },

    updateByAdmin: (changes: UpdateUserByAdmin): UpdateUserByAdmin => {
        return {

            ...changes,
            role: UserRole.consumer || UserRole.retailer || UserRole.superAdmin,
            updatedAt: new Date()

        }
    }

}