import { Request, Response } from 'express';
import { UserMapper } from '../mappers/user.mapper';
import { AdminUserDTO, PrivateUserDTO } from '../types/dto/UserDTO';
import { ValidationError, NotFoundError, AppError } from '../classes/ErrorHandling';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import type { ApiResponse } from '../types/ApiResponse';
import { convertStringToObjectId } from '../utils/convertData';
import { CreateUserService, 
        deleteOwnAccountService, 
        getUserByIdService,
        updateOwnAccountService,
        deleteUserAccountService,
        getAllUsersService,
        UpdateUserByAdmin,
        CreateUserAsAdminService
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

// CREATE USER AS ADMIN
export async function createUserAsAdmin(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO>>): Promise<void> {
    try {
        const userDataRole = req.user!.role;
        if(userDataRole === 'admin'){
            const userData = req.body;

            if(Object.values(userData).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten får inte vara tomma', );
        };

        const newUser = await CreateUserAsAdminService(userData);

        if(!newUser) {
            throw new NotFoundError('Kan inte matcha och retunera användaren');
        };
        const adminDTO = UserMapper.toAdminDTO(newUser);

        res.status(201).json({ data: adminDTO });

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

// DELETE ACCOUNT
export async function deleteUser(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {   
    try {
        // OWN USER ACCOUNT
        const userData = req.user!;
        // Convert userID from string to ObjectId
        const userID = convertStringToObjectId(userData.userID);

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
            const userID = new ObjectId(String(_id));

            if(!email) {
                throw new ValidationError('Kan inte validera användarens mail')};

            await deleteUserAccountService(userID, email);
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
        const userID = convertStringToObjectId(userData.userID);
        

        if(userData.role === 'customer' || userData.role === 'sales'){
            const myUser = await getUserByIdService(userID);
            const myUserDTO: PrivateUserDTO = UserMapper.toPrivateDTO(myUser);

            res.status(200).json({ message: `retunerar användaren:`, data: myUserDTO});

        } else if(userData.role === 'admin'){
            const { _id } = req.body;
            if(!ObjectId.isValid(_id)){
                throw new ValidationError('Kunde inte validera ID sträng');
            }
            const theUserID = new ObjectId(String(_id));
            const user = await getUserByIdService(theUserID);
            const userDTO: AdminUserDTO = UserMapper.toAdminDTO(user);

            res.status(200).json({ message: `Användaren som Admin begärde`, data: userDTO })
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

// UPDATE OWN ACCOUNT
export async function updateOwnAccount(
    req:AuthenticatedRequest, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void>{

    const userDataID = req.user!.userID;
    const userData = req.body;
    const updatedUserData = await updateOwnAccountService(userDataID, userData);

    res.status(200).json({
        message: `Användaren ${updatedUserData.name}`,
        data: updatedUserData
    });
};

// UPDATE USER AS ADMIN
export async function updateUserByAdmin(
    req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO>>): Promise<void> {
    try {
        const userData = req.user!;

        if(userData.role === 'admin'){
            const { user } = req.body;
            const userAccountID = user._id;
            const userAccountData = { ...user };
            
            const response = await UpdateUserByAdmin(userAccountID, userAccountData);
            const adminDTO: AdminUserDTO = UserMapper.toAdminDTO(response);

            res.status(200).json({
                message: `Användaren: ${adminDTO.name} har uppdaterats!`,
                data: adminDTO
            });
        }

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
    _req: AuthenticatedRequest, res: Response<ApiResponse<AdminUserDTO[]>>): Promise<void> {
    try {
     
        const adminDTOs = await getAllUsersService();
        const names = adminDTOs.map(u => u.name);
        const count = adminDTOs.length;

        res.status(200).json({ 
            message: `retunerar ${count} användare: ${names}`, 
            data: adminDTOs });
        
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