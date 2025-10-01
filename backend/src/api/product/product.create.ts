import { Request, Response } from "express";
import { getDb } from "../../lib/mongodb";
import { ProductFactory } from "../../factories/product.factory";
import type { Product } from "../../types/product/Products";
import type { ApiResponse } from "../../types/ApiResponse";


async function createProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {


    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    try {

        const newProduct = ProductFactory.create({

            title: req.body.title,
            price: req.body.price,
            pricePerKilo: req.body.pricePerKilo,
            weight: req.body.weight,
            originCountry: req.body.originCountry,
            customerGroup: req.body.customerGroup,
            category: req.body.categoryID,
            nutritionalContent: req.body.nutritionalContentID

        });

        const createProduct = await productCollection.insertOne(newProduct);

        res.status(201).json({ 
            message: 'Produkten har lagts till',
            data: { ...newProduct, _id: createProduct.insertedId }
         });


    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
}

export default createProduct;