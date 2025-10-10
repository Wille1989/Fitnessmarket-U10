import bcrypt from 'bcrypt';
import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { CreateUser, User,UpdateUser, UpdateUserByAdmin } from "../../types/user/User";
import { ConflictError, NotFoundError, ValidationError } from '../../classes/ErrorHandling';
import { UserFactory } from "../../factories/user.factory";
import { validateUser } from '../../validators/user/user.validate';

// CREATE USER
export async function CreateUserService(
    formBody: CreateUser): Promise<User> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    // validate the user, method runs in a seperate file
    validateUser(formBody);

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email: formBody.email });
    if(existingUser) {
        throw new ConflictError('Det finns redan en användare med denna mejladress');
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(formBody.password, 10);

    // Create new userobject
    const newUser = UserFactory.create(
        {
            ...formBody,
            email: formBody.email,
            password: hashedPassword
        }
    );

    // Send data to database
    const response = await userCollection.insertOne(newUser);

    // Send this data back from database
    return { ...newUser, _id: response.insertedId }
};

// DELETE OWN ACCOUNT
export async function deleteOwnAccountService(
    userID: ObjectId, data: string): Promise<void> {
    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const response = await userCollection.deleteOne({ _id: userID, email: data });

    if(response.deletedCount === 0) {
        throw new NotFoundError('Kunde inte ta bort ditt användare konto')};
};

// ADMIN DELETE USER ACCOUNT
export async function deleteUserAccountService(
    userID: ObjectId, email: string): Promise<User | null> {
    const db = await getDb();
    const result = await db.collection<User>('users').findOneAndDelete({ _id: userID, email: email });

    if(!result) {
        throw new NotFoundError('Kunde inte ta bort användaren, ID eller Email matchade ej')};

    return result;
};

// GET USER
export async function getUserByIdService(
    userID: ObjectId): Promise<User> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const theUser = await userCollection.findOne({ _id: userID });

    if(!theUser) {
        throw new NotFoundError('Kunde inte retunera någon användare');
    };

    return theUser;
};

// GET ALL USERS
export async function getAllUsersService(): Promise<User[]> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const theUsers = await userCollection.find({}).toArray();

    if(theUsers.length === 0) {
        throw new ValidationError('Kunde inte hitta några användare!');
    };

    return theUsers;
};

// FIND AND UPDATE USER
export async function updateOwnAccountService(
    userDataID: ObjectId, changes: UpdateUser): Promise<User> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const current = await userCollection.findOne({ _id: userDataID });

    if(!current) {
        throw new NotFoundError('Kunde inte hämta från databasen');
    };

    if(Object.keys(changes).length === 0){
        throw new ValidationError('Det finns inga fält att uppdatera');
    };

    const updatedUser = UserFactory.update(current, changes);

    if(Object.keys(changes).length === 0) {
        throw new ValidationError('Inga fält att uppdatera');
    };

    const returnUpdatedUser = await userCollection.findOneAndUpdate(
        { _id: userDataID },
        { $set: updatedUser },
        { returnDocument: 'after' }
    );

    if(!returnUpdatedUser) {
        throw new NotFoundError('Datan är null');
    };

    return returnUpdatedUser;
};

// FIND AND UPDATE A USER AS ADMIN
export async function UpdateUserByAdmin(
    userDataID: ObjectId, changes: UpdateUserByAdmin): Promise<User> {

    const db = await getDb();
    const currentUserData = await db.collection<User>('users').findOne({ _id: userDataID });

    if(!currentUserData) {
        throw new NotFoundError('Hittar inget dokument som matchar ID')};

    const updatedUserData = UserFactory.updateByAdmin(currentUserData, changes);

    const result = await db.collection<User>('users').findOneAndUpdate(
        { _id: userDataID },
        { $set: updatedUserData },
        { returnDocument: 'after' }
    );

    if(!result) {
        throw new NotFoundError(`Kunde inte retunera resultat`)};

    return result;
};