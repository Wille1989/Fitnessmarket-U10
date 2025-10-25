import { api } from "./axios";
import type { Product } from "../types/Products/Products";

export const ProductApi = {

    index: async():Promise<Product[]> => {
        const result = await api.get('product/index');
        console.log(result.data.data);
        return result.data.data;
    },

    create: async(data: Product): Promise<Product> => {
        const result = await api.post('product/new', data);
        console.log(result.data.data);
        return result.data.data;
    },

    show: async(id: string): Promise<Product> => {
        const result = await api.get(`product/show/${id}`);
        console.log(result.data.data);
        return result.data.data
    },

    update: async(data: Product): Promise<Product> => {
        const result = await api.patch(`product/update`, data);
        console.log(result.data.data);
        return result.data.data;
    },

    delete: async(id: string): Promise<Product> => {
        const result = await api.delete(`product/delete/${id}`);
        console.log(result.data.data);
        return result.data.data;
    },

    compare: async(data: Product): Promise<Product> => {
        const result = await api.post('product/compare', data);
        console.log(result.data.data);
        return result.data.data;
    },

    rate: async(data: Product): Promise<void> => {
        const result = await api.post('product/rate', data);
        console.log(result.data.data);
        return result.data.data;
    }

}
