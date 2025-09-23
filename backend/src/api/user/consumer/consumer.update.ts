import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { UserFactory } from '../../../factories/user.factory';
import type { User } from '../../../types/user/User';
import type { ApiResponse } from '../../../types/ApiResponse';

async function findAndUpdateUser (req: Request, res: Response<ApiResponse<User>>): Promise<void> {

    const userID: string = req.params.id;
    const updateUser = UserFactory.update(req.body);
    const db = await getDb();
    const userCollection = db.collection<User>('users');

    try {

        const response = await userCollection.findOneAndUpdate(
            { userID },
            { $set: updateUser },
            { returnDocument: 'after' }
        );

        res.status(200).json({ 
            message: 'användaren uppdaterades', 
            data: response 
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error });
        return;
    }
    
}

export default findAndUpdateUser;