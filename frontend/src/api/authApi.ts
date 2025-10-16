import type { LoginResponse, Logindata } from "../types/User/UserAuth";
import { api } from "./axios";

export const authApi = {

    login: async (data: Logindata): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await api.post<{ message: string }>('/auth/logout');
        return response.data;
    }
    
}