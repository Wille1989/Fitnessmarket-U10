import { api } from "./axios";
import type { Order } from "../types/Order/Order";


export const orderApi = {

    index: async(): Promise<Order[]> => {
        const result = await api.get('/order/myOrders');
        console.log(result.data.data);
        return result.data.data;
    },

    show: async(id: string): Promise<Order> => {
        const result = await api.get(`order/show/${id}`);
        return result.data.data;
    },

    deleteOrder: async(id: string): Promise<void> => {
        const result = await api.delete(`order/delete/${id}`);
        return result.data.data;
    },

    checkout: async(data: Order): Promise<Order> => {
        const result = await api.post('/order/checkout', data);
        return result.data.data;
    }

}