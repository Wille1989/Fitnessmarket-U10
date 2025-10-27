import { useCallback } from "react";
import { useMessage } from "../context/MessageProvider";
import { useState } from "react";
import { ProductApi } from "../api/productApi";
import type { Product, UpdateProduct, ProductRating, CreateProduct, ComparedProducts } from "../types/Products/Products";

function useProduct() {
    const { setErrorMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product |null>(null);
    const [productArray, setArrayProduct] = useState<Product[]>([]);
    const [comparison, setComparison] = useState<ComparedProducts>();
    const [rating, setRating] = useState<ProductRating>();


    const index = useCallback(async(): Promise<Product[] | null> => {
        try {
            setLoading(true);

            const result = await ProductApi.index();

            if(!Array.isArray(result) || result.length === 0) {
                throw new Error('resultatet är inte en array eller hittas inte')
            }

            setArrayProduct(result);
            return result;
            
        } catch (error: any) {
            if (process.env.NODE_ENV !== "production") {
                console.error("Fel vid hämtning av produkter:", error);
            }
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, [])

    async function create(data: CreateProduct): Promise<Product | null> {

        try {
            setLoading(true);

            const result = await ProductApi.create(data);

            if(!result) {
                throw new Error('Kunde inte skapa ny produkt');
            };

            setProduct(result);
            return result;

        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => {
                setErrorMessage(null)
            }, 1000);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function show(id: string): Promise<Product | null> {
        try {
            setLoading(true);

            const result = await ProductApi.show(id);

            if(!result) {
                throw new Error('Kan inte hitta produkten');
            }

            setProduct(result);
            return result;
            
        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function update(id:string, data: UpdateProduct) {
        try {
            setLoading(true);

            const result = await ProductApi.update(id, data);
            console.log(result);

            if(!result) {
                throw new Error('Kunde inte uppdatera produkten');
            }

            setProduct(result);

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }

    async function deleteProduct(id: string) {
        try {
            setLoading(true);

            const result = await ProductApi.delete(id);

            setProduct(result);

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } setLoading(false);
    }

    async function compare(productsID: string[]) {
        try {
            setLoading(true);

            const result = await ProductApi.compare(productsID);

            if(!result) {
                throw new Error('Kunde inte hämta jämförelsen');
            }

            setComparison(result);

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }

    async function rate(id: string, ratingValue: string) {
        try {
            setLoading(true);

            const result = await ProductApi.rate({id,ratingValue});

            if(!result) {
                throw new Error('Produktens omdöme kunde inte uppdaterats');
            }

            setRating(result);

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }

    return { index, create, show, update, deleteProduct, compare, rate, loading, product, productArray, comparison, rating }

}

export default useProduct;