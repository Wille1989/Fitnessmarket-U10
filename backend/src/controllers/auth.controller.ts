import { Request, Response } from 'express';
import { AppError } from '../classes/ErrorHandling';
import { loginUserService } from '../services/user/auth.service';
import { UserMapper } from '../mappers/user.mapper';
import type { ApiResponse } from '../types/ApiResponse';
import type { LoginPayload } from '../types/user/UserAuth';
import type { AuthenticatedRequest } from '../types/user/UserAuth';

// LOG IN
export async function loginUser(
    req: Request, res: Response<ApiResponse<LoginPayload>>): Promise<void> {
    try {
        const myUser = req.body;

        const { user, token } = await loginUserService(myUser);

        const filteredData = UserMapper.toPrivateDTO(user);

        res.status(200).json({ message: 'Svar Från Databas:', data: { user: filteredData, token }})
        
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

// LOG OUT
export async function logoutUser(
    _req: AuthenticatedRequest, res: Response<ApiResponse<boolean>>): Promise<void> {
    try {

        res.status(200).json({ message: 'du är utloggad!', data: true });

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