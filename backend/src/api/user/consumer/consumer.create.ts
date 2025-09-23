import { Request, Response } from 'express';
import { UserFactory } from '../../../factories/user.factory';
import { getDb } from '../../../lib/mongodb';
import type { ApiResponse } from '../../../types/ApiResponse';
import type { CreateUser } from '../../../types/user/User';

export async function createUser(req: Request, res: Response<ApiResponse<CreateUser>>): Promise<void> {

    try {

        const db = await getDb();

        const users = db.collection<CreateUser>('users'); // skapa tabellen om den inte finns
        const newUser = UserFactory.create(req.body); // ta in användarens input

        if(!newUser) {
            res.status(400).json({ 
                message: 'fel när användaren skickades in', 
                data: newUser 
            });

            return;
        };

        const response = await users.insertOne(newUser); // skicka in en användare

        if(!response) {
            res.status(400).json({ message: 'Något gick fel' });
            return;
        };

        res.status(201).json({ 
            message: 'Användare skapad', 
            data: { ...newUser, _id: response.insertedId } });
        
    } catch (error) {

        res.status(500).json({ 
            message: 'server error', 
            error: error 
        });

        return;
    }

};