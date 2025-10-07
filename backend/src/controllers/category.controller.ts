import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { Category } from '../types/product/Category';
import { ValidationError, AppError } from '../classes/ErrorHandling';
import { 
    createCategoryService, 
    deleteCategoryService, 
    getAllCategoriesService, 
    getCategoryByIdService, 
    updateCategoryService } 
    from '../services/product/category.service';

export async function createCategory(req: Request, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        const { body } = req.body;
        if(Object.values(body).some(v => v === null || v === undefined || v === '')) {
            throw new ValidationError('Alla fält måste vara ifyllda');
        };

        const result = await createCategoryService(body);

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

export async function deleteCategory(req: Request, res: Response<ApiResponse<null>>): Promise<void> {
    try {
        const { id } = req.params;
        const categoryID = new ObjectId(id);

        if(!ObjectId.isValid(id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        await deleteCategoryService(categoryID);

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

export async function updateCategory(req: Request, res: Response<ApiResponse<Category>>): Promise<void> {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const categoryID = new ObjectId(id);

        if(!ObjectId.isValid(id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        if(Object.values(body).some(v => v === null || v === undefined || v === '')){
            throw new Error('Alla fält måste ha ett värde');
        };

        await updateCategoryService(categoryID, body);

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

export async function getCategory(req: Request, res: Response<ApiResponse<Category | Category[]>>): Promise<void> {
    try {
        const { id } = req.params;
        if(id) {
            const categoryID = new ObjectId(id);
            if(!ObjectId.isValid(id)) {
                throw new ValidationError('Ogiltigt ID');
            };

            const response = await getCategoryByIdService(categoryID);

            res.status(200).json({ data: response });

        } else {
            const response = await getAllCategoriesService();

            res.status(200).json({ data: response });
        }
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