import { Request, Response } from 'express';
import { ApiResponse } from '../types/ApiResponse';
import { CreateProduct } from '../types/product/Products';


export async function createProduct(req: Request, res: Response<ApiResponse<CreateProduct>>): Promise<void> {

    const frontendData = req.body;

    

}