import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateUsers() {

    const [loading,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOnClick = async () => {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigate('/adminDashboard/users');

        setLoading(false);
    }

    return (
        <button onClick={handleOnClick} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Användare'}
        </button>
    )
}

export default NavigateUsers;