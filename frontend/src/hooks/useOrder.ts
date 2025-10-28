import { useCallback, useState } from "react";
import { useMessage } from "../context/MessageProvider";
import { orderApi } from "../api/orderApi";
import { Order } from "../types/Order/Order";


export function useOrder() {
    const [loading, setLoading] = useState<boolean>(false);
    const { setErrorMessage } = useMessage();
    const [order, setOrder] = useState<Order>();
    const [orderArray, setOrderArray] = useState<Order[]>([]);

    const index = useCallback(async (): Promise<Order[] | null> => {

        try {
            setLoading(true);
            const result = await orderApi.index();

            if(!Array.isArray(result)) {
                throw new Error('retunerad data är inte array');
            }

            setOrderArray(result);
            return result;

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
            return null;
        } finally {
            setLoading(false);
        }

    }, [])


    async function show(id: string): Promise<Order | null> {
        try {
            setLoading(true);

            const result = await orderApi.show(id);

            if(!result) {
                throw new Error('Hittade ingen order');
            }

            setOrder(result);
            return result;

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function deleteOrder(id: string): Promise<void> {
        try {
            setLoading(true);

            const result = await orderApi.deleteOrder(id);

            return result;

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }

    async function checkout(data: Order): Promise<Order | null> {
        try {
            setLoading(true);

            const result = await orderApi.checkout(data);

            setOrder(result);
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

    return { loading, orderArray, order, index, show, deleteOrder, checkout }

}