import { Request, Response } from 'express';
import { UserMapper } from '../mappers/user.mapper';
import type { AdminUserDTO, PrivateUserDTO } from '../types/dto/UserDTO';
import type { AuthenticatedRequest } from '../types/user/UserAuth';
import type { ApiResponse } from '../types/ApiResponse';
import { AppError, AuthorizationError } from '../classes/ErrorHandling';
import { CreateUserService, 
        deleteOwnAccountService, 
        getUserByIdService,
        updateOwnAccountService,
        deleteUserAccountService,
        getAllUsersService,
        UpdateUserByAdmin,
        CreateUserAsAdminService
        } from '../services/user/user.service';
import { User } from '../types/user/User';

// CREATE USER
export async function createUser(
    req: Request, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void> {
    try {
        const userData = req.body;
        const newUser = await CreateUserService(userData);
        const filteredData = UserMapper.toPrivateDTO(newUser);

        res.status(201).json({ message: 'Ny användare har skapats!', data: filteredData });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// CREATE USER AS ADMIN
export async function createUserAsAdmin(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO>>): Promise<void> {
    try {
        const user = req.user;
        const data = req.body;

        if(user?.role === 'admin'){
            const userData = data;

        const newUser = await CreateUserAsAdminService(userData);

        const adminDTO = UserMapper.toAdminDTO(newUser);

        res.status(201).json({ data: adminDTO });

        } else {
            throw new AuthorizationError('Du har inte behörighet för detta');
        };
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

export async function deleteUserAccount(req: AuthenticatedRequest, res: Response<ApiResponse<User>>): Promise<void> {
    const { id } = req.params;

    await deleteUserAccountService(id);

    res.status(200).json({ message: 'användaren har raderats' })
}

// DELETE ACCOUNT
export async function deleteUser(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {   
    try {
        const user = req.user!;

        if(user?.role !== 'admin') {

            const userID = user.userID;
            const userEmail = user.email;

            await deleteOwnAccountService(userID, userEmail);

            res.status(200).json({ message: `Du har tagit bort ditt konto!`, data: null });
        }

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });

    };
};

// SHOW USER
export async function getUserById(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO>>): Promise<void> {
    try {
            const customerID = req.params.id;

            const customerData = await getUserByIdService(customerID);

            const filteredAdminData: AdminUserDTO = UserMapper.toAdminDTO(customerData);

            res.status(200).json({ message: `Användaren som admin begärde`, data: filteredAdminData })

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        }); 
    };
};


export async function getUserByToken(
    req: AuthenticatedRequest, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void> {
    
    try {

            const userID = req.user!.userID;
            const myUser = await getUserByIdService(userID);
            const filteredData: PrivateUserDTO = UserMapper.toPrivateDTO(myUser);

            res.status(200).json({ message: `retunerar användaren:`, data: filteredData});
            
    } catch (error) {
         const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        }); 
    }
}

// ADMIN
export async function updateUserAccount(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO>>): Promise<void> {
    try {
        const { id: userID, ...userData } = req.body;

        const result = await UpdateUserByAdmin(userID, userData);

        const filteredAdminData: AdminUserDTO = UserMapper.toAdminDTO(result);

        res.status(200).json({ message:'Från Admin Update:', data: filteredAdminData });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
}

// UPDATE ACCOUNT
export async function updateAccount(
    req:AuthenticatedRequest, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void>{
    try {
        const userID = req.user!.userID;
        const data = req.body;
        console.log(data);
        console.log(userID);

        const userData = data;

        const updatedData = await updateOwnAccountService(userID, userData);

        const filteredData: PrivateUserDTO = UserMapper.toPrivateDTO(updatedData); 

        res.status(200).json(({ 
            message: 'Dina uppgifter har uppdaterats!', data: filteredData }));

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};

// GET ALL USERS
export async function getUsers(
    _req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO[]>>): Promise<void> {
    try {
     
        const users = await getAllUsersService();

        res.status(200).json({ 
            message: `BACKEND SVAR: ${users.length} användare hämtas`, 
            data: users });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};