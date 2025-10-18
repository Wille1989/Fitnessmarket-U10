import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserManager } from "../../../hooks/useUserManager";

function NavigateUpdate() {
    const [loading, setLoading] = useState<boolean>(false);
    const { showMyAccount } = useUserManager();
    const navigate = useNavigate();


    const handleNavigate = async() => { 
        setLoading(true);

        showMyAccount();       

        setTimeout(() => navigate('/adminDashboard/update'), 1500);
    
        setLoading(false);

    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Redigera'}
        </button>
    )
}

export default NavigateUpdate;