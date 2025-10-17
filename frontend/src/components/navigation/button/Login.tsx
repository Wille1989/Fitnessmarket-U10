import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleOnClick = async () => {

        setLoading(true);
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/login');

        setLoading(false);
    }

    return (
        <button onClick={handleOnClick} disabled={loading}>
            {loading ? 'Logga in' : 'Omdirigerar'}
        </button>
    )
}

export default Login;