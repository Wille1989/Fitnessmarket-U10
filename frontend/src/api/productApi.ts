import { api } from "./axios";
import type { Product, ProductRating, UpdateProduct, CreateProduct, ComparedProducts } from "../types/Products/Products";

export const ProductApi = {

    index: async():Promise<Product[]> => {
        const result = await api.get('product/index');
        return result.data.data;
    },

    create: async(data: CreateProduct): Promise<Product> => {
        const result = await api.post('product/new', data);
        return result.data.data;
    },

    show: async(id: string): Promise<Product> => {
        const result = await api.get(`product/show/${id}`);
        return result.data.data
    },

    update: async(id: string, data: UpdateProduct): Promise<Product> => {
        const result = await api.patch(`product/update/${id}`, data);
        return result.data.data;
    },

    delete: async(id: string): Promise<Product> => {
        const result = await api.delete(`product/delete/${id}`);
        return result.data.data;
    },

    compare: async(productsID: string[]): Promise<ComparedProducts> => {
        const result = await api.post('product/compare', {products: productsID});
        return result.data.data;
    },

    rate: async(data: { id: string, ratingValue: string }): Promise<ProductRating> => {
        console.log(data)
        const result = await api.post('product/rate', data);
        return result.data.data;
    }

}
