import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import type { User } from '../../../types/user/User';
import type { ApiResponse } from '../../../types/ApiResponse';


async function deleteUser(req: Request, res: Response<ApiResponse<User>>): Promise<void> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');
    const userID: string = req.params.id;
    

    try {

        const response = await userCollection.deleteOne({ userID });

        if(response.deletedCount === 0 ) {
            res.status(404).json({ message: `Kunde inte hitta någon användaren med ID: ${userID}` });
            return;
        };

        res.status(200).json({ message: `användaren är borttagen!` });

    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error 
        });
        return;
    }
}

export default deleteUser;