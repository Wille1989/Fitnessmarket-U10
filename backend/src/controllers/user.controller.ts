import { 
    Request, 
    Response 
} from 'express';
import { 
    CreateUserService, 
    deleteUserService, 
    getUserByIdService,
    findAllUsersService,
    findAndUpdateUserService
} from '../services/user/user.service';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { 
    CreateUser, 
    User 
} from '../types/user/User';
import { UserMapper } from '../mappers/user.mapper';
import { PrivateUserDTO } from '../types/dto/UserDTO';



// CREATE USER
export async function createUser(req: Request, res: Response<ApiResponse<CreateUser>>): Promise<void> {

    try {
        // User input
        const frontendData = req.body;

        // Run the method of creating a user
        const newUser = await CreateUserService(frontendData);

        

        // Response
        res.status(201).json({ data: newUser });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error 

        });
        return;

    };
};


// DELETE USER
export async function deleteUser(req: Request, res: Response<ApiResponse<null>>): Promise<void> {   
    try {

        if(!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Inget giltigt ID' });
            return;
        };

        const userID = new ObjectId(req.params.id);
        await deleteUserService(userID);

        res.status(200).json({ message: `användaren är borttagen!` });
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error

        });
        return;

    };
};


// GET THE USER
export async function getUserById(req: Request, res: Response<ApiResponse<PrivateUserDTO>>): Promise<void> {
    try {

        const userID = new ObjectId(req.params.id);

        const user = await getUserByIdService(userID);

        if(!user) {
            res.status(404).json({ message: 'Användaren kunde inte hittas' });
            return;
        };

        const DTO = UserMapper.toPrivateDTO(user);

        res.status(200).json({ 
            message: 'Användaren hittades!',
            data: DTO
        });

    } catch (error) {

        res.status(500).json({ 
            message: 'Kunde inte hämta användare', 
            error: error
        });
    };
};

// GET ALL USERS
export async function findAllUsers(_req: Request, res: Response<ApiResponse<User[]>>): Promise<void> {
    try {

        const getAllUsers = await findAllUsersService();

        if(getAllUsers.length === 0) {
            res.status(404).json({ message: 'Inga användare retunerades!' });
            return;
        };

        res.status(200).json({
            message: `Retunerar ${getAllUsers.length} användare`,
            data: getAllUsers
        });
        
    } catch (error) {
         res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error });
        return;
    };
};

// UPDATE USER
export async function findAndUpdateUser (req: Request, res: Response<ApiResponse<User>>): Promise<void> {
    try {

        if(ObjectId.isValid(req.params.id)) {
            res.status(404).json({ message: 'Felaktigt ID' });
            return;
        };
        const userID = new ObjectId(req.params.id);

        const frontendData = req.body;
        if(Object.keys(frontendData.length === 0)) {
            res.status(404).json({ message: 'Tom data!' });
            return;
        };

        const response = await findAndUpdateUserService(userID, frontendData)

        if(response == null) {
            res.status(404).json({ message: 'Svaret är tomt'});
            return;
        };

        res.status(200).json({ 
            message: 'användaren uppdaterades', 
            data: response
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!', 
            error: error });
        return;
    };
};