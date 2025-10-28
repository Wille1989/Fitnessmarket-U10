import useProduct from "../../../hooks/useProduct"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function HandleDeleteProduct() {
    const { id } = useParams();
    const { deleteProduct } = useProduct();
    const navigate = useNavigate();

    const handleOnClick = async() => {

        if(id) {
            await deleteProduct(id)
            navigate('/');
        } else {
            throw new Error('Produktens ID saknas')
        }
        
    }

    return (
        <button type="button" onClick={handleOnClick}>Ta bort produkt</button>
    )
}

export default HandleDeleteProduct;