import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminMangement } from "../../../hooks/useAdminManagement";

function NavigateEdit({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const { showUserAccount } = useAdminMangement();
    const navigate = useNavigate();


    const handleNavigate = async() => { 
        setLoading(true);

        showUserAccount(id);       

        setTimeout(() => navigate(`/admin/user/${id}`), 1500);
    
        setLoading(false);

    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Redigera'}
        </button>
    )
}

export default NavigateEdit;