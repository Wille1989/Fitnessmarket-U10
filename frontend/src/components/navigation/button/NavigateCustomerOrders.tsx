import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateCustomerOrders({ id }: { id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleCustomerOrders = async() => { 
        setLoading(true);

        setTimeout(() => navigate(`/admin/user/orders/${id}`), 1500);
    
        setLoading(false);

    }

    return (
        <button onClick={handleCustomerOrders} disabled={loading}>
            {loading ? 'Omdirigerar' : 'Hämta ordrar'}
        </button>
    )
}

export default NavigateCustomerOrders;