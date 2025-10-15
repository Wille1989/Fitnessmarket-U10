import bcrypt from 'bcrypt';
import getDb from "../../lib/mongodb";
import type { CreateUser, User,UpdateUser, UpdateUserByAdmin } from "../../types/user/User";
import { ConflictError, NotFoundError, ValidationError } from '../../classes/ErrorHandling';
import { UserFactory } from "../../factories/user.factory";
import { validateUser, validateUserUpdate } from '../../validators/user/user.validate';
import { AdminUserDTO } from '../../types/dto/UserDTO';
import { UserMapper } from '../../mappers/user.mapper';
import { convertStringToObjectId } from '../../utils/convertData';

// CREATE USER (CONFIRMED WORKING WITH INSOMNIA)
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

// CREATE USER AS ADMIN (CONFIRMED WORKING WITH INSOMNIA)
export async function CreateUserAsAdminService(
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
        },
        true
    );

    // Send data to database
    const response = await userCollection.insertOne(newUser);

    // Send this data back from database
    return { ...newUser, _id: response.insertedId }
};

// DELETE OWN ACCOUNT (CONFIRMED WORKING WITH INSOMNIA)
export async function deleteOwnAccountService(
    id: string, userEmail: string): Promise<void> {

    const userID = convertStringToObjectId(id);
    
    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const response = await userCollection.deleteOne({ _id: userID, email: userEmail });

    if(response.deletedCount === 0) {
        throw new NotFoundError('Kunde inte ta bort ditt användare konto')};

};

// ADMIN DELETE USER ACCOUNT (CONFIMED WORKING WITH INSOMNIA)
export async function deleteUserAccountService(
    id: string): Promise<User | null> {

    const customerID = convertStringToObjectId(id);

    const db = await getDb();

    const result = await db.collection<User>('users')
    .findOneAndDelete({ _id: customerID });

    if(!result) {
        throw new NotFoundError('Kunde inte ta bort användaren')};

    return result;
};

// GET USER (CONFIMED WORKING WITH INSOMNIA)
export async function getUserByIdService(
    id: string): Promise<User> {

    const userID = convertStringToObjectId(id);

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const theUser = await userCollection.findOne({ _id: userID });

    if(!theUser) {
        throw new NotFoundError('Kunde inte retunera någon användare');
    };

    return theUser;
};

// GET ALL USERS (CONFIMED WORKING WITH INSOMNIA)
export async function getAllUsersService(): Promise<AdminUserDTO[]> {

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const users = await userCollection.find({}).toArray();

    if(users.length === 0) {
        throw new ValidationError('Kunde inte hitta några användare!');
    };

    const adminDTOs = users.map(u => UserMapper.toAdminDTO(u));

    return adminDTOs;
};

// FIND AND UPDATE USER (CONFIMED WORKING WITH INSOMNIA)
export async function updateOwnAccountService(
    userDataID: string, changes: UpdateUser): Promise<User> {

    const validatedChanges = validateUserUpdate(changes);
    const validatedID = convertStringToObjectId(userDataID);

    const db = await getDb();
    const userCollection = db.collection<User>('users');

    const currentData = await userCollection.findOne({ _id: validatedID });

    if(!currentData) {
        throw new NotFoundError('Kunde inte hämta från databasen');
    };

    if(Object.keys(changes).length === 0){
        throw new ValidationError('Det finns inga fält att uppdatera');
    };

    const updatedUser = UserFactory.update(currentData, validatedChanges);

    // Throw away the value of objectId 
    delete (updatedUser)._id;

    // loop through the entries of the object and throw values if null or undefined
    for (const [key, value] of Object.entries(updatedUser)) {
        if (value == null) delete updatedUser[key as keyof User];
    };

    const returnUpdatedUser = await userCollection.findOneAndUpdate(
        { _id: validatedID },
        { $set: updatedUser },
        { returnDocument: 'after' }
    );

    if(!returnUpdatedUser) {
        throw new NotFoundError('Datan är null');
    };

    return returnUpdatedUser;
};

// FIND AND UPDATE A USER AS ADMIN (CONFIMED WORKING WITH INSOMNIA)
export async function UpdateUserByAdmin(
    userDataID: string, changes: UpdateUserByAdmin): Promise<User> {

    const validatedChanges = validateUserUpdate(changes);
    const validatedUserDataID = convertStringToObjectId(userDataID);

    const db = await getDb();
    const currentUserData = await db.collection<User>('users').findOne({ _id: validatedUserDataID });

    if(!currentUserData) {
        throw new NotFoundError('Kan inte hitta ID eller så är värdet tomt')
    };

    const { _id, ...userWithoutID } = currentUserData;

    const updatedUserData = UserFactory.updateByAdmin(userWithoutID, validatedChanges);
    
    // Throw away the value of objectId 
    delete (updatedUserData)._id;

    // loop through the entries of the object and throw values if null or undefined
    Object.entries(updatedUserData).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            delete updatedUserData[key as keyof User];
        }
    });

    const result = await db.collection<User>('users').findOneAndUpdate(
        { _id: validatedUserDataID },
        { $set: updatedUserData },
        { returnDocument: 'after' }
    );

    if(!result) {
        throw new NotFoundError(`Kunde inte retunera resultat`)};

    return result;
};