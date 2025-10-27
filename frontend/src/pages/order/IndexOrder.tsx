import { useOrder } from "../../hooks/useOrder"
import HandleDeleteOrder from "../../components/navigation/button/HandleDeleteOrder";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminMangement } from "../../hooks/useAdminManagement";

function IndexOrder() {
    const { index, orderArray, loading } = useOrder();
    const { id } = useParams();
    const { indexCustomerOrder } = useAdminMangement()

    useEffect(() => {
        if(id) {
            indexCustomerOrder(id);
        } else {
            index();
        }
    },[id, indexCustomerOrder, index]);
    
    if(loading) return <p><strong>Laddar ordrar...</strong></p>
    if(orderArray.length === 0) return <p><strong>Inga ordrar hittades...</strong></p>

    return (
        <>
            <ul>
                {orderArray.map((order) => (
                    <li key={order._id}>{`${order.orderNumber}`}
                    <HandleDeleteOrder id={order._id!}/>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default IndexOrder;