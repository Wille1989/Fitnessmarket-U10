import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { Category } from '../types/product/Category';
import { ValidationError, AppError } from '../classes/ErrorHandling';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { validateUserId } from '../validators/user/user.validate';
import { 
    createCategoryService, 
    deleteCategoryService, 
    getAllCategoriesService, 
    getCategoryByIdService, 
    updateCategoryService } 
    from '../services/product/category.service';

// CREATE CATEGORY
export async function createCategory(
    req: AuthenticatedRequest, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        // Token validation
        validateUserId(req.user!.userID);

        // Destruct title and description from category object
        const { title, description } = req.body.category;

        // Check that title and description has value      
        if(!title || !description) {
            throw new ValidationError('titel eller beskrivning saknas')};

        // Send desctructed valeus to service
        const result = await createCategoryService(title, description);

        // response with message and data
        res.status(201).json({ message: 'Ny kategori tillagd!', data: result });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK CATEGORY:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// DELETE CATEGORY
export async function deleteCategory(req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {
    try {
        // Token validation
        validateUserId(req.user!.userID);

        // destrukt id from category object
        const { _id } = req.body.category;

        // check that string is valid
        if(!ObjectId.isValid(_id)) {
            throw new ValidationError('Ogiltligt ID')};

        // convert string to objectId
        const categoryID = new ObjectId(String(_id));

        // send to service / database
        await deleteCategoryService(categoryID);

        // response with a message
        res.status(200).json({ message: 'Kategorin har tagits bort' });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK CATEGORY:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// UPDATE A CATEGORY
export async function updateCategory(
    req: AuthenticatedRequest, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        // Token validation
        validateUserId(req.user!.userID);

        // Destruct values from category object
        const { _id, title, description } = req.body.category;

        // Check string valid for req id
        if(!ObjectId.isValid(_id)){
            throw new ValidationError('Kunde inte validera ID')};

        // convert string to objectID
        const categoryID = new ObjectId(String(_id));

        // Send to database
        await updateCategoryService(categoryID, title, description);

        // the response from database
        res.status(200).json({ message: 'Kategorin har uppdaterats!' });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK CATEGORY:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// GET A CATEGORY BY ITS ID
export async function getCategoryById(req: AuthenticatedRequest, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        // User validation
        validateUserId(req.user!.userID);

        // Destruct value id from object category
        const { id } = req.params;

        // Check that string is valid from category object
        if(!ObjectId.isValid(id)) {
            throw new ValidationError(`Valideringen misslyckades ${id}`)};

        // Convert string til objectID
        const categoryID = new ObjectId(id);

        // send data to service
        const result = await getCategoryByIdService(categoryID);

        // response from database
        res.status(200).json({ message: 'retunerar kategori', data: result });
    
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK CATEGORY:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// GET ALL CATEGORIES IN DATABASE
export async function getCategory(
    _req: Request, res: Response<ApiResponse<Category[]>>): Promise<void> {
    try {

        const result = await getAllCategoriesService()

        res.status(200).json({ message: `retunerar: ${result.length} kategorier`, data: result })

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK CATEGORY:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};