import { useOrder } from "../../hooks/useOrder"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import { useState } from "react";

function IndexOrder() {
    const { index, orderArray, loading: orderLoading } = useOrder();
    const { id } = useParams();
    const { indexCustomerOrder, loading: adminLoading } = useAdminManagement()
    const [orders, setOrders] = useState(orderArray);

    useEffect(() => {
        async function fetchData() {
             if(id) {
            const result = await indexCustomerOrder(id);
            if (result) setOrders(result);
        } else {
            const result = await index();
            if(result) setOrders(result);
        }
        } fetchData(); },[id, indexCustomerOrder, index]);

        console.log(orders);
    
    if(orderLoading || adminLoading) return <p><strong>Laddar ordrar...</strong></p>
    if(orderArray.length === 0) return <p><strong>Inga ordrar hittades tyvärr</strong></p>

    return (
        <>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>{`${order.orderNumber}`}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default IndexOrder;