import { User } from "../types/user/User";
import type { 
    PublicUserDTO,
    PrivateUserDTO,
    AdminUserDTO
} from "../types/dto/UserDTO";

export const UserMapper = {

    toPublicDTO: (user: User): PublicUserDTO => ({
        name: user.name
    }),

    toPrivateDTO: (user: User): PrivateUserDTO => ({
        name: user.name,
        email: user.email
    }),

    toAdminDTO: (user: User): AdminUserDTO => ({
        id: user._id?.toString(),
        updatedAt: user.updatedAt ?? undefined,
        createdAt: user.createdAt ?? undefined,
        createdByAdmin: user.createdByAdmin ?? false,
        name: user.name,
        email: user.email,
        role: user.role,
    }),
};