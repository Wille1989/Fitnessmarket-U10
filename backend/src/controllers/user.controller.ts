import { 
    Request, 
    Response 
} from 'express';
import { 
    CreateUserService, 
    deleteUserService, 
    getUserByIdService,
    findAllUsersService,
    findAndUpdateUserService,
} from '../services/user/user.service';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { 
    CreateUser, 
    User 
} from '../types/user/User';
import { UserMapper } from '../mappers/user.mapper';
import { PrivateUserDTO } from '../types/dto/UserDTO';
import { ValidationError, NotFoundError } from '../classes/ErrorHandling';

// CREATE USER
export async function createUser(req: Request, res: Response<ApiResponse<CreateUser>>): Promise<void> {
    try {
        const frontendData = req.body;

        if(Object.values(frontendData).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten får inte vara tomma', );
        };

        const newUser = await CreateUserService(frontendData);

        if(!newUser) {
            throw new NotFoundError('Användaren kunde inte hittas', 404);
        };

        res.status(201).json({ data: newUser });
        
    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK:');
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

// DELETE USER
export async function deleteUser(req: Request, res: Response<ApiResponse<null>>): Promise<void> {   
    try {
        const { id } = req.params;
        const userID = new ObjectId(id);

        if(!ObjectId.isValid(userID)) {
            throw new ValidationError('Ogiltigt ID');
        };

        if(!userID) {
            throw new NotFoundError('Användaren kunde inte hittas');
        };

        await deleteUserService(userID);

        res.status(200).json({ message: `användaren är borttagen!` });

    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK:');
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
export async function getUserById(req: Request, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void> {
    try {
        const { id } = req.params;
        const userID = new ObjectId(id);
        
        if(!ObjectId.isValid(id)){
            throw new ValidationError('Ogiltigt ID')
        };

        const user = await getUserByIdService(userID);

        if(!user) {
            throw new NotFoundError('Kunde inte hitta användare');
        };

        const DTO = UserMapper.toPrivateDTO(user);

        res.status(200).json({ 
            message: 'Användaren hittades!',
            data: DTO
        });

    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK:');
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
export async function findAllUsers(_req: Request, res: Response<ApiResponse<User[]>>): Promise<void> {
    try {
        const getAllUsers = await findAllUsersService();

        if(getAllUsers.length === 0) {
            throw new NotFoundError('Inga användare hittades');
        };

        res.status(200).json({
            message: `Retunerar ${getAllUsers.length} användare`,
            data: getAllUsers
        });
        
    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK:');
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
export async function findAndUpdateUser(req: Request, res: Response<ApiResponse<User>>): Promise<void> {
    try {
        const { id } = req.params;
        const userID = new ObjectId(id);
        const frontendData = req.body;

        if(ObjectId.isValid(userID)) {
            throw new ValidationError('Ogiltigt ID');
        };

        if(Object.values(frontendData).some(v => v === null || v === undefined || v === '')) {
            throw new ValidationError('Fälten måste ha värden');
        };

        const response = await findAndUpdateUserService(userID, frontendData)

        if(response == null) {
            throw new NotFoundError('Datan kunde inte uppdateras');
        };

        res.status(200).json({ message: 'användaren uppdaterades', data: response });

    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK:');
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

