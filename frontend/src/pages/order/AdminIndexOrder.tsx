import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminManagement } from "../../hooks/useAdminManagement";
import { Alert } from "../../components/alert/Alert";
import '../../css/order/CustomerOrders.css';

function AdminIndexOrder() {
  const { customerOrder, indexCustomerOrder } = useAdminManagement();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) indexCustomerOrder(id);
  }, [id, indexCustomerOrder]);

  useEffect(() => {
    if (!customerOrder || customerOrder.length === 0) {
      setInfoMessage('Hittar inga tidigare beställningar')
    } else {
      setInfoMessage(null);
    }
  }, [customerOrder])
 
  return (
    <>
      {infoMessage && <Alert type="info" message={infoMessage} />}

      <div className="order-page">
        <ul className="order-overview">
          {customerOrder.map((c) => (
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
  );
}

export default AdminIndexOrder;