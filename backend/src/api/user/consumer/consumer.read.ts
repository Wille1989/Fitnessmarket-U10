import { Request, Response } from 'express';
import type { User } from '../../../types/user/User';
import { getDb } from '../../../lib/mongodb';
import type { ApiResponse } from '../../../types/ApiResponse';


async function getConsumer(_req: Request, res: Response<ApiResponse<User[]>>): Promise<void> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    try {

        const users = await userCollection.find({}).toArray();

        res.status(200).json({ 
            message: 'Användare hittades!', 
            data: users,
        });
        
    } catch (error) {

        res.status(500).json({ 
            message: 'Kunde inte hämta användare', 
            error: error
        });
        return;
    }

}

export default getConsumer;