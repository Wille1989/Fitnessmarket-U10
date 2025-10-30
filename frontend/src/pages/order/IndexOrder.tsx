import { useOrder } from "../../hooks/useOrder"
import { useEffect, useState } from "react";
import { Alert } from "../../components/alert/Alert";
import '../../css/order/MyOrders.css';

function IndexOrder() {
    const { index, orderArray } = useOrder();
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    useEffect(() => {
        index();
    },[index])

    useEffect(() => {
        if(orderArray.length === 0) {
            setInfoMessage('Oops det verkar som att du inte har några tidigare beställningar');
        } else {
            setInfoMessage(null);
        }
    })
    
    return (
        <>
            {infoMessage && <Alert type="info" message={infoMessage} />}
            
            <div className="order-page">
                <ul className="order-overview">
                {orderArray.map((c) => (
                    <li key={c._id}><span>Order #</span>{String(c.orderNumber)} - {String(c.sumOfOrder)}:- 
                        <ul className="order-details">
                            {c.content.map((productItem, item) => (
                            <li key={item}>
                                <span>{productItem.title}</span> - <span>{productItem.quantity}st</span> - <span>{productItem.price}:-</span>
                            </li>
                            ))}
                        </ul>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}

export default IndexOrder;