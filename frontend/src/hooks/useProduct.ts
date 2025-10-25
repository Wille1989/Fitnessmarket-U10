import { useCallback } from "react";
import { useMessage } from "../context/MessageProvider";
import { useState } from "react";
import { ProductApi } from "../api/productApi";
import type { Product } from "../types/Products/Products";

function useProduct() {
    const { setErrorMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product[]>([]);

    const index = useCallback(async(): Promise<Product[]> => {
        try {
            setLoading(true);

            const result = await ProductApi.index();

            if(!Array.isArray(result) || result.length === 0) {
                throw new Error('resultatet är inte en array eller hittas inte')
            }

            setProduct(result);
            return result;
            
        } catch (error: any) {
            console.log(error);
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [])

    return { index, loading, product }

}

export default useProduct;