import { CategoryApi } from "../api/categoryApi";
import { useMessage } from "../context/MessageProvider";
import { Category, CreateCategory } from "../types/Products/Category";
import { useCallback, useState } from "react";

export function useCategory() {
    const { setErrorMessage } = useMessage();
    const [category, setCategory] = useState<Category>();
    const [categoryArray, setCategoryArray] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const indexCategory = useCallback(async () => {
        try {

            setLoading(true);

            const result = await CategoryApi.index();

            if(!result) {
                throw new Error('Finns inget resultat att hämta');
            }

            if(!Array.isArray(result) || result.length === 0) {
                throw new Error('Resultatet är antingen tomt eller inte en array');
            }

            setCategoryArray(result);
            
        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }

    }, [])

    async function createCategory(data: CreateCategory) {
        try {

            const result = await CategoryApi.create(data);

            if(!result) {
                throw new Error('Kunde inte skapa kategori');
            }

            setCategory(result);
            
        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
        }

    }

    async function deleteCategory(id: string) {
         try {
            
            await CategoryApi.delete(id);

         } catch(error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
         }
    }

    async function showCategory(id: string) {
        try {

            const response = await CategoryApi.show(id);
            setCategory(response);

        } catch(error: any ) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        }
    }

    return { createCategory, deleteCategory, showCategory, indexCategory, category, categoryArray, loading }
}