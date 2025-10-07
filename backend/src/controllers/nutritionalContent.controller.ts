import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { NutritionalContent } from '../types/product/NutritionalContent';
import { AppError, ValidationError } from '../classes/ErrorHandling';
import { 
    createNutrionalContentService, 
    deleteNutritionalContentService,
    getNutritionalContentByIdService,
    getNutritionalContentsService,
    updateNutritionalContentService } 
    from '../services/product/nutritionalContent.service';

export async function createNutritionalContent(
    req: Request, res: Response<ApiResponse<NutritionalContent>>): Promise<void> {

    try {
        const body = req.body;

        if(Object.values(body).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Ogiltiga värden i fälten');
        };

        const result = await createNutrionalContentService(body);

        res.status(201).json({ message: 'Näringsinnehåll till produkt skapad', data: result });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK NUTRITIONALCONTENT:');
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
        return;
    };
};

export async function deleteCategory(req: Request, res: Response<ApiResponse<null>>) {
    try {
        const { id } = req.params;
        const categoryID = new ObjectId(id);

        if(!ObjectId.isValid(id)){
            throw new ValidationError('Ogiltligt ID');
        };

        await deleteNutritionalContentService(categoryID);

        res.status(200).json({ message: 'Kategorin har tagits bort' });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK NUTRITIONALCONTENT:');
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
        return;
    }; 
};

export async function updateNutritionalContent(req: Request, res: Response<ApiResponse<NutritionalContent>>): Promise<void> {

    try {
        const body = req.body;
        const { id } = req.params;
        const categoryID = new ObjectId(id);

        if(!ObjectId.isValid(id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        if(Object.values(body).some(v => v === null || v === undefined || v === '')){
            throw new ValidationError('Fälten innehåller otillåtna värden');
        };

        const result = await updateNutritionalContentService(categoryID, body);

        res.status(200).json({ message: 'Näringsinnehållet har uppdaterats', data: result });
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK NUTRITIONALCONTENT:');
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
        return;
    };
};

export async function getNutritionalContent(
    req: Request, res: Response<ApiResponse<NutritionalContent | NutritionalContent []>>): Promise<void> {
    try {
        const { id } = req.params;

        if(id) {
            const categoryID = new ObjectId(id);

            if(!ObjectId.isValid(id)) {
                throw new ValidationError('Ogiltigt ID');
            };

            await getNutritionalContentByIdService(categoryID);
            res.status(200).json({ message: `retunerar Näringsinnehåll från ID: ${categoryID}` });
        } else {
            const result = await getNutritionalContentsService();

            res.status(200).json({ message: `retunerar ${result.length} dokument med näringsinnehåll` });
        };
        
    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK NUTRITIONALCONTENT:');
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
        return;
    };
};