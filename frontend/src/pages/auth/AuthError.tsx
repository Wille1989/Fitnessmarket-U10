import { useEffect, useState } from "react"
import { Alert } from "../../components/alert/Alert";
import { useNavigate } from "react-router-dom";

function AuthError() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        setErrorMessage('Sessionen har löpt ut, klicka nedan för att logga in på nytt');
    },[]);

    const handleClick = async() => {

        navigate('/login');
        setErrorMessage(null);

    }

    return (
        <>
            { errorMessage && <Alert type="error" message={errorMessage} />}

            <button type="button" onClick={handleClick}>Logga in igen</button>
        </>
    )
}

export default AuthError;