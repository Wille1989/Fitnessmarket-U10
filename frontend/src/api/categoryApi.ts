import { api } from "./axios";
import { CreateCategory, Category, UpdateCategory } from "../types/Products/Category";

export const CategoryApi = {

    create: async (data: CreateCategory): Promise<Category> => {
        const result = await api.post('/cat/create', data);
        return result.data.data;
    },

    delete: async (id: string): Promise<void> => {
        const result = await api.delete(`/cat/delete/${id}`);

        return result.data.data;
    },

    update: async (id: string, data: UpdateCategory): Promise<Category> => {
        const result = await api.patch(`/cat/update/${id}`, data);

        return result.data.data;
    },

    show: async(id: string): Promise<Category> => {
        const result = await api.get(`/cat/show/${id}`);

        return result.data.data;
    },

    index: async(): Promise<Category[]> => {
        const result = await api.get('/cat/index');
        return result.data.data;
    }

}