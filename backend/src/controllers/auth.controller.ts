import { Request, Response } from 'express';
import type { ApiResponse } from '../types/ApiResponse';
import type { LoginPayload } from '../types/user/UserAuth';
import type { AuthenticatedRequest } from '../types/user/UserAuth';
import { AppError, ValidationError } from '../classes/ErrorHandling';
import { loginUserService } from '../services/user/auth.service';
import { UserMapper } from '../mappers/user.mapper';
import { convertStringToObjectId } from '../utils/convertData';

// LOG IN (CONFIRMED WORKING WITH INSOMNIA)
export async function loginUser(req: Request, res: Response<ApiResponse<LoginPayload>>): Promise<void> {

    try {
        // store request from frontend
        const frontendData = req.body;
        // Check object from req contain values
        if(Object.values(frontendData).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten måste vara ifyllda');
        };
        // object with the user and the token 
        const { user, token } = await loginUserService(frontendData);
        // filter sensitive data
        const privateDTO = UserMapper.toPrivateDTO(user);

        res.status(200).json({ message: 'Svar Från Databas:', data: { user: privateDTO, token }})
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK AUTH:');
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

// LOG OUT (CONFIRMED WORKING WITH INSOMNIA)
export async function logoutUser(_req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {
    try {

        res.status(200).json({ message: 'du är utloggad!', data: null });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK AUTH:');
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