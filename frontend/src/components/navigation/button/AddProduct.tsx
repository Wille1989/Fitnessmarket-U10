import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function NavigateAddProduct() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOnClick = async () => {
        setLoading(true);

        navigate('/adminDashboard/product/create');

        setLoading(false);

    }

    return (
        <>
            <button type="submit" onClick={handleOnClick} disabled={loading}>
                {loading ? 'Laddar sidan' : 'Lägg till ny produkt'}
            </button>
        </>
    )

}

export default NavigateAddProduct;