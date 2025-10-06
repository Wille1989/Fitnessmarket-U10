import { Request, Response } from 'express';
import type { ApiResponse } from '../types/ApiResponse';
import type { LoginPayload } from '../types/user/auth';
import { ValidationError } from '../classes/ErrorHandling';
import { loginUserService } from '../services/user/user.service';

export async function loginUser(req: Request, res: Response<ApiResponse<LoginPayload>>): Promise<void> {

    try {
        const frontendData = req.body;

        if(Object.values(frontendData).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten måste vara ifyllda');
        };

        const { user, token } = await loginUserService(frontendData);

        res.status(200).json({ message: 'datan matchade, inloggad', data: { user, token }})
        
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
    }
};

 export async function logoutUser(_req: Request, res: Response<ApiResponse<null>>): Promise<void> {

    res.status(200).json({ message: 'du är utloggad!', data: null });

};

