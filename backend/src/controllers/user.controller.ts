import { Request, Response } from 'express';
import { UserMapper } from '../mappers/user.mapper';
import { AdminUserDTO, PrivateUserDTO } from '../types/dto/UserDTO';
import { ValidationError, NotFoundError, AppError } from '../classes/ErrorHandling';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { validateUserId, validateUser } from '../validators/user/user.validate';
import type { ApiResponse } from '../types/ApiResponse';
import { CreateUserService, 
        deleteOwnAccountService, 
        getUserByIdService,
        updateOwnAccountService,
        deleteUserAccountService,
        getAllUsersService,
        UpdateUserByAdmin
        } from '../services/user/user.service';
import { ObjectId } from 'mongodb';

// CREATE USER
export async function createUser(
    req: Request, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void> {
    try {
        const userData = req.body;

        if(Object.values(userData).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten får inte vara tomma', );
        };

        const newUser = await CreateUserService(userData);

        if(!newUser) {
            throw new NotFoundError('Användaren kunde inte hittas');
        };
        const privateDTO = UserMapper.toPrivateDTO(newUser);

        res.status(201).json({ data: privateDTO });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK USER:');
            console.error('Name:', err.name);
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

// DELETE ACCOUNT
export async function deleteUser(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {   
    try {
        // OWN USER ACCOUNT
        const userData = req.user!;
        // Convert userID from string to ObjectId
        const userID = validateUserId(userData.userID);

        if(!userData.email) {
            throw new ValidationError('Kan inte validera din mailadress')};

        if(userData.role === 'customer'){
            await deleteOwnAccountService(userID, userData.email);
            res.status(200).json({ message: `användaren är borttagen!`, data: null });
            console.log(`Användare ${userData.email} raderade ID(${userID}).`);

        } else if (userData.role === 'admin'){ // access a users account as admin
            const { _id, email } = req.body.user;

            if(!ObjectId.isValid(_id)){
                throw new ValidationError('Validering av ID misslyckades')};
            new ObjectId(String(_id));

            if(!email) {
                throw new ValidationError('Kan inte validera användarens mail')};

            await deleteUserAccountService(_id, email);
            res.status(200).json({ message: `användaren med email ${email} är borttagen!`, data: email });
            console.log(`Användare ${email} raderade ID(${_id}).`);
        } else {
            throw new ValidationError('Kontakta admin för borttagning av konto');
        };
 
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK USER:');
            console.error('Name:', err.name);
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

// GET THE USER
export async function getUserById(
    req: AuthenticatedRequest, res: Response<ApiResponse<PrivateUserDTO | AdminUserDTO>>): Promise<void> {
    try {   
        // OWN USER ACCOUNT
        const userData = req.user!;
        // Convert userID from string to ObjectId
        const userID = validateUserId(userData.userID);

        if(userData.role === 'customer' || userData.role === 'sales'){
            const myUser = await getUserByIdService(userID);
            const myUserDTO: PrivateUserDTO = UserMapper.toPrivateDTO(myUser);

            res.status(200).json({ message: `retunerar användaren med ID: ${userID}`, data: myUserDTO});

        } else if(userData.role === 'admin'){
            const user = await getUserByIdService(userID);
            const userDTO: AdminUserDTO = UserMapper.toAdminDTO(user);

            res.status(200).json({ message: `retunerar användaren: ${userDTO}`, data: userDTO })
        };

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK USER:');
            console.error('Name:', err.name);
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

// UPDATE USER
export async function updateUser(
    req: AuthenticatedRequest, res: Response<ApiResponse<PrivateUserDTO | AdminUserDTO>>): Promise<void> {
    try {
        // OWN USER ACCOUNT
        const userData = req.user!;
        // Convert userID from string to ObjectId
        const userDataID = validateUserId(userData.userID);
        
        if(userData.role === 'customer' || userData.role === 'sales'){
            const myUser = validateUser(req.body);
            const response = await updateOwnAccountService(userDataID, myUser);
            const privateDTO: PrivateUserDTO = UserMapper.toPrivateDTO(response);

            res.status(200).json({ 
                message: `Användaren ${privateDTO.name} har uppdaterats!`, data: privateDTO });

        } else if(userData.role === 'admin') {
            const user = validateUser(req.body);
            const userID = req.body._id;
            const response = await UpdateUserByAdmin(userID, user);
            const adminDTO: AdminUserDTO = UserMapper.toAdminDTO(response);

            res.status(200).json({ 
                message: `användaren med ID:${adminDTO.name, adminDTO.email}` });
        };

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK USER:');
            console.error('Name:', err.name);
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

// GET ALL USERS
export async function getUsers(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO[]>>): Promise<void> {
    try {
     
        const users = await getAllUsersService();
        const adminDTOs: AdminUserDTO[] = users.map(u => UserMapper.toAdminDTO(u));

        res.status(200).json({ message: `retunerar ${adminDTOs}`, data: adminDTOs })
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK USER:');
            console.error('Name:', err.name);
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