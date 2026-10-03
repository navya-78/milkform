// OrderCard.jsx
export default function OrderCard({
  orderId,
  customerName,
  items = [],
  total,
  status,
  onView,
}) {
  return (
    <article>
      <h2>Order #{orderId}</h2>
      {customerName && <p>Customer: {customerName}</p>}
      <p>Items: {items.length}</p>
      {total != null && <p>Total: ₹{total}</p>}
      {status && <p>Status: {status}</p>}
      {onView && (
        <button type="button" onClick={onView}>
          View order
        </button>
      )}
    </article>
  );
}