import { useState } from "react";

export function useMessageStore() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string |null>(null);
    const [arrayErrorMessage, setArrayErrorMessage] = useState<string | null>(null);
    const [arraySuccesMessage, setArraySuccessMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string |null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    return { 
        successMessage, setSuccessMessage, 
        errorMessage, setErrorMessage,
        arrayErrorMessage, setArrayErrorMessage,
        arraySuccesMessage, setArraySuccessMessage,
        formError, setFormError,
        formSuccess, setFormSuccess
        };
}
