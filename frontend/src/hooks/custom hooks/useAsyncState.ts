import { useState } from "react";

export function useAsyncState< T >() {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMes, setErrorMes] = useState<string | null>(null);
    const [successMes, setSuccessMes] = useState<string | null>(null);

    return { 
        data, setData, 
        loading, setLoading, 
        errorMes, setErrorMes, 
        successMes, setSuccessMes 
    };
};