import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateCustomerOrders({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleCustomerOrders = async() => { 
        setLoading(true);

        setTimeout(() => navigate(`/admin/user/orders/${id}`), 800);
    
        setLoading(false);

    }

    return (
        <button type="button" onClick={handleCustomerOrders} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Beställningar'}
        </button>
    )
}

export default NavigateCustomerOrders;