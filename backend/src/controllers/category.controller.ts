import { Request, Response } from 'express';
import { ValidationError, AppError } from '../classes/ErrorHandling';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import type { ApiResponse } from '../types/ApiResponse';
import type { Category } from '../types/product/Category';
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
        // Destruct title and description from category object
        const categoryData = { title: req.body.title, description: req.body.description }

        // Check that title and description exists    
        if(!categoryData.title || !categoryData.description) {
            throw new ValidationError('titel eller beskrivning saknas')};

        // Send desctructed values to service
        const result = await createCategoryService(categoryData);

        // response with message and data
        res.status(201).json({ message: 'Ny kategori tillagd!', data: result });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
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
export async function deleteCategory(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {
    try {
        const categoryID = req.params.id;

        await deleteCategoryService(categoryID);

        res.status(200).json({ message: 'Kategorin har tagits bort' });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
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
        // Destruct values from category object
        const { category: { _id: categoryID, ...categoryData } } = req.body;
    
        const result = await updateCategoryService(categoryID, categoryData);

        res.status(200).json({ message: 'Kategorin har uppdaterats!', data: result });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
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
export async function getCategoryById(
    req: AuthenticatedRequest, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        const categoryID = req.params.id;

        // send data to service
        const result = await getCategoryByIdService(categoryID);

        // response from database
        res.status(200).json({ message: 'retunerar kategori', data: result });
    
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
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