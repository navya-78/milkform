import { Link } from "react-router-dom";
import { getOrders } from "../orderService";

export default function Orders() {
  const orders = getOrders();

  return (
    <main>
      <h1>My Orders</h1>
      <p><Link to="/user/orders/new">Place an order</Link></p>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/user/orders/${order.id}`}>
                {order.product} — {order.quantity} L — ₹{order.total} — {order.status}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}