import { CreateUser, User } from "../types/user/User";
import type { 
    PublicUserDTO,
    PrivateUserDTO,
    AdminUserDTO
} from "../types/dto/UserDTO";

export const UserMapper = {

    toPublicDTO: (user: User): PublicUserDTO => ({
        id: user._id?.toString(),
        name: user.name
    }),

    toPrivateDTO: (user: User): PrivateUserDTO => ({
        id: user._id?.toString(),
        name: user.name,
        email: user.email,
        role: user.role
    }),

    toAdminDTO: (user: User): AdminUserDTO => ({
        id: user._id?.toString(),
        name: user.name,
        email: user.email,
        userRole: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt?.toISOString()
    }),

    toDTO: (user: User, view: 'public' | 'private' | 'admin') => {
        switch(view) {
            case 'public': return UserMapper.toPublicDTO(user);
            case 'private': return UserMapper.toPrivateDTO(user);
            case 'admin': return UserMapper.toAdminDTO(user) as AdminUserDTO;
        };
    }
};