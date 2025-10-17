import { useState } from "react";

export function useAsyncState< T >() {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    function resetState() {
        setData(null);
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(false);
    }

    return { 
        data, setData, 
        loading, setLoading, 
        errorMessage, setErrorMessage, 
        successMessage, setSuccessMessage,
        resetState
    };


};