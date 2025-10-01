import bcrypt from 'bcrypt';
import getDb from "../../lib/mongodb";
import { UserFactory } from "../../factories/user.factory";
import { ObjectId } from "mongodb";
import type { 
    CreateUser, 
    User,
    UpdateUser
} from "../../types/user/User";



// CREATE USER
export async function CreateUserService(frontendData: CreateUser): Promise<User> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    // trim and lowercase to check in next step
    const sanitizedEmail = frontendData.email.trim().toLowerCase();

     // Check if user already exists
    const existingUser = await userCollection.findOne({ email: sanitizedEmail });
    if(existingUser) {
        throw new Error('Det finns redan en användare med denna mejladress.');
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(frontendData.password, 10);

    // Create new userobject
    const newUser = UserFactory.create(
        {
            ...frontendData,
            email: sanitizedEmail,
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
        throw new Error('Ingen användare hittades med det ID:t');
    };
};

// GET USER
export async function getUserByIdService(userID: ObjectId): Promise<User | null> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const foundUser = await userCollection.findOne({ _id: userID });

    return foundUser;
};

// GET ALL USERS
export async function findAllUsersService(): Promise<User[]> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const foundUsers = await userCollection.find({}).toArray();

    if(foundUsers.length === 0) {
        throw new Error('Kunde inte hitta några användare!');
    };

    return foundUsers;
};

// FIND AND UPDATE USER
export async function findAndUpdateUserService(userID: ObjectId, frontendData: UpdateUser): Promise<User | null> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');
    const updatedUser = UserFactory.update({ ...frontendData });

    if(Object.keys(frontendData).length === 0) {
        throw new Error('Inga fält att uppdatera');
    };

    const returnUpdatedUser = await userCollection.findOneAndUpdate(
        { userID },
        { $set: updatedUser },
        { returnDocument: 'after' }
    );

    return returnUpdatedUser;
};