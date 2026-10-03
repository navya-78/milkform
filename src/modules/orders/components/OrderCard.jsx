export default function OrderCard({ order, onView }) {
  return (
    <article>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status ?? "Pending"}</p>
      <p>Total: ₹{order.total ?? 0}</p>
      {onView && (
        <button type="button" onClick={() => onView(order)}>
          View order
        </button>
      )}
    </article>
  );
}