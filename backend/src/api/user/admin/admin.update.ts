import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { UserFactory } from '../../../factories/user.factory';
import type { ApiResponse } from '../../../types/ApiResponse';
import type { User } from '../../../types/user/User';

async function adminUpdateAUser(req: Request, res: Response<ApiResponse<User>>): Promise<void> {

    const userID: string = req.params.id;
    const adminUpdateUser = UserFactory.updateByAdmin(req.body); 
    const db = await getDb();
    const userCollection = db.collection<User>('users');

    try {

        const user = await userCollection.findOneAndUpdate(
            { userID },
            { $set: adminUpdateUser },
            { returnDocument: 'after' }
        );

        res.status(200).json({ 
            message: 'Användaren uppdaterades!', 
            data: user 
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error });
        return;
    }

}

export default adminUpdateAUser;