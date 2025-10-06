import bcrypt from 'bcrypt';
import getDb from "../../lib/mongodb";
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import type { 
    CreateUser, 
    User,
    UpdateUser
} from "../../types/user/User";
import { 
    ConflictError, 
    NotFoundError, 
    ValidationError 
} from '../../classes/ErrorHandling';
import { UserFactory } from "../../factories/user.factory";
import { validateUser } from '../../validators/user/user.validate';

// CREATE USER
export async function CreateUserService(frontendData: CreateUser): Promise<User> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    // validate the user, method runs in a seperate file
    validateUser(frontendData);

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email: frontendData.email });
    if(existingUser) {
        throw new ConflictError('Det finns redan en användare med denna mejladress');
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(frontendData.password, 10);

    // Create new userobject
    const newUser = UserFactory.create(
        {
            ...frontendData,
            email: frontendData.email,
            password: hashedPassword
        }
    );

    // Send data to database
    const response = await userCollection.insertOne(newUser);

    // Send this data back from database
    return { ...newUser, _id: response.insertedId }
};

// DELETE USER
export async function deleteUserService(userID: ObjectId): Promise<void> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const response = await userCollection.deleteOne({ _id: userID });

    if(response.deletedCount === 0) {
        throw new NotFoundError('Ingen användare hittades med det ID:t');
    };
};

// GET USER
export async function getUserByIdService(userID: ObjectId): Promise<User | null> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const theUser = await userCollection.findOne({ _id: userID });

    return theUser;
};

// GET ALL USERS
export async function findAllUsersService(): Promise<User[]> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const theUsers = await userCollection.find({}).toArray();

    if(theUsers.length === 0) {
        throw new ValidationError('Kunde inte hitta några användare!');
    };

    return theUsers;
};

// FIND AND UPDATE USER
export async function findAndUpdateUserService(userID: ObjectId, frontendData: UpdateUser): Promise<User | null> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');
    const updatedUser = UserFactory.update({ ...frontendData });

    if(Object.keys(frontendData).length === 0) {
        throw new ValidationError('Inga fält att uppdatera');
    };

    const returnUpdatedUser = await userCollection.findOneAndUpdate(
        { _id: userID },
        { $set: updatedUser },
        { returnDocument: 'after' }
    );

    return returnUpdatedUser;
};

export async function loginUserService(frontendData: User): Promise<{ user: User, token: string }> {

    validateUser(frontendData);

    const token = jwt.sign(
        { 
            userID: frontendData._id, 
            email: frontendData.email, 
            role: frontendData.role 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '2h' }
    );

    if(!token) {
        throw new NotFoundError('Kunde inte skapa token');
    };

    return { user: frontendData, token};
};