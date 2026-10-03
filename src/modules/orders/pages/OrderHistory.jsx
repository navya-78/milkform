import OrderCard from "../components/OrderCard";

export default function OrderHistory({ orders = [], onView }) {
  return (
    <main>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} onView={onView} />
        ))
      )}
    </main>
  );
}