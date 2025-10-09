import type { User } from '../../types/user/User';
import { validateUser } from '../../validators/user/user.validate';
import { NotFoundError } from '../../classes/ErrorHandling';
import getDb from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.config';

// LOG IN USER
export async function loginUserService(data: User): Promise<{ user: User, token: string }> {

    validateUser(data);

    const db = await getDb();
    const existingUser = await db.collection<User>('users').findOne({ email: data.email });
    const secret: string = jwtConfig.secret;

    if(!existingUser) {
        throw new NotFoundError('Det finns ingen användare med denna epost adressen')};

    const token = jwt.sign(
        { 
            userID: existingUser._id, 
            email: existingUser.email, 
            role: existingUser.role
        },
        secret,
        { expiresIn: '2h' }
    );

    if(!token) {
        throw new NotFoundError('Kunde inte skapa token')};

    return { user: existingUser, token};
};