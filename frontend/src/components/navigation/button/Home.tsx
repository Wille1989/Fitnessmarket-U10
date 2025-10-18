import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateHome() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigate = async () => {

        setLoading(true);

        setTimeout(() => {   
            navigate('/');
        }, 1500);

        setLoading(false);

    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Hem'}
        </button>
    )

}

export default NavigateHome;