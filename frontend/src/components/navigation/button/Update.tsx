import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminMangement } from "../../../hooks/useAdminManagement";

function NavigateUpdate({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const { showUserAccount } = useAdminMangement();
    const navigate = useNavigate();


    const handleNavigate = async() => { 
        setLoading(true);

        showUserAccount(id);       

        setTimeout(() => navigate(`/adminDashboard/update/${id}`), 1500);
    
        setLoading(false);

    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Redigera'}
        </button>
    )
}

export default NavigateUpdate;