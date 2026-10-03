export default function DeliveryCard({ delivery, onView }) {
  return (
    <article>
      <h2>Delivery #{delivery.id}</h2>
      <p>Customer: {delivery.customerName ?? "—"}</p>
      <p>Address: {delivery.address ?? "—"}</p>
      <p>Status: {delivery.status ?? "Pending"}</p>
      {onView && (
        <button type="button" onClick={() => onView(delivery)}>
          View delivery
        </button>
      )}
    </article>
  );
}