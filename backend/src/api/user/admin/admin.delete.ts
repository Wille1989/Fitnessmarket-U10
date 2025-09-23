import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import type { User } from '../../../types/user/User';
import type { ApiResponse } from '../../../types/ApiResponse';

async function findUserAndDelete(req: Request, res: Response<ApiResponse<User>>): Promise<void> {

    const userID: string = req.params.id;
    const db = await getDb();
    const userCollection = db.collection<User>('users');

    try {

        const response = await userCollection.findOneAndDelete({ userID });

        if(!response) {
            res.status(404).json({ message: 'Kunde inte ta bort användaren' });
            return;
        };

        res.status(200).json({ message: 'användaren togs bort' });
        return;
        
    } catch (error) {
        res.status(500).json({ message: 'Något gick fel när servern anropades!', error });
        return;
    };

}

export default findUserAndDelete;