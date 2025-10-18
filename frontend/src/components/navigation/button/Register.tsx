import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateRegister(){
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigate = async() => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate('/register');

        setLoading(false);
    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            { loading ? 'Registrera' : 'Omdirigerar' }
        </button>
    )
}

export default NavigateRegister;