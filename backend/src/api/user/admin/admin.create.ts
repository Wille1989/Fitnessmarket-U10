import { Request, Response } from 'express';
import { UserFactory } from '../../../factories/user.factory';
import { getDb } from '../../../lib/mongodb';
import type { CreateUser } from '../../../types/user/User';
import type { ApiResponse } from '../../../types/ApiResponse';

async function adminCreateAUser (req: Request, res: Response<ApiResponse<CreateUser>>): Promise<void> {

    const adminCreateNewUser = UserFactory.create(req.body);
    const db = await getDb();
    const userCollection = db.collection<CreateUser>('users');
    
    try {

        const newUser = await userCollection.insertOne(adminCreateNewUser);

        if(!newUser) {
            res.status(400).json({ message: 'Kunde inte skapa en ny användare' });
            return;
        }

        res.status(201).json({ 
            message: 'ny användare skapad!', 
            data: { ...adminCreateNewUser, _id: newUser.insertedId } });
        return;
        
    } catch (error) {
        res.status(500).json({ message: 'Något gick fel när servern anropades!', error: error });
        return;
    }

}

export default adminCreateAUser;