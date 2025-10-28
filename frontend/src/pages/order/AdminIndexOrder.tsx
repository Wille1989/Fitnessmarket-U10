import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminManagement } from "../../hooks/useAdminManagement";

function AdminIndexOrder() {
  const { customerOrder, indexCustomerOrder, loading } = useAdminManagement();
  const { id } = useParams();

  useEffect(() => {
    if (id) indexCustomerOrder(id);
  }, [id, indexCustomerOrder]);

  if (loading) return <p>Laddar kundens ordrar...</p>;
  if (!customerOrder || customerOrder.length === 0)
    return <p>Inga ordrar hittades.</p>;

  return (
    <ul>
      {customerOrder.map((c) => (
        <li key={c._id}>Order #{String(c.orderNumber)} – {String(c.sumOfOrder)}
        </li>
      ))}
    </ul>
  );
}

export default AdminIndexOrder;