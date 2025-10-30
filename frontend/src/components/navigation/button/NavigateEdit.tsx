import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminManagement } from "../../../hooks/useAdminManagement";

function NavigateEdit({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const { showUserAccount } = useAdminManagement();
    const navigate = useNavigate();


    const handleNavigate = async() => { 
        setLoading(true);

        showUserAccount(id);       

        setTimeout(() => navigate(`/admin/user/${id}`), 800);
    
        setLoading(false);

    }

    return (
        <button onClick={handleNavigate} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Redigera'}
        </button>
    )
}

export default NavigateEdit;