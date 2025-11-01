import { useEffect, useState } from "react"
import { Alert } from "../../components/alert/Alert";

function AuthError() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setErrorMessage('Sessionen har löpt ut, du måste logga in igen');
    },[]);

    return (
        <>
            { errorMessage && <Alert type="error" message={errorMessage} />}
        </>
    )
}

export default AuthError;