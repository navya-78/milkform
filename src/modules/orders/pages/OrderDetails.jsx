import OrderSummary from "../components/OrderSummary";

export default function OrderDetails({ order }) {
  if (!order) return <p>Order not found.</p>;

  return (
    <main>
      <h1>Order #{order.id}</h1>
      <p>Status: {order.status ?? "Pending"}</p>
      {order.createdAt && (
        <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
      )}
      <OrderSummary items={order.items ?? []} total={order.total} />
    </main>
  );
}