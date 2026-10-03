// DeliveryCard.jsx
export default function DeliveryCard({
  orderId,
  customerName,
  address,
  status,
  onView,
}) {
  return (
    <article>
      <h2>Delivery #{orderId}</h2>
      <p>Customer: {customerName}</p>
      <p>Address: {address}</p>
      <p>Status: {status}</p>
      {onView && (
        <button type="button" onClick={onView}>
          View delivery
        </button>
      )}
    </article>
  );
}