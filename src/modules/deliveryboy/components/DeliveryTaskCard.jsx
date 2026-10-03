export default function DeliveryTaskCard({ delivery, onUpdateStatus }) {
  return (
    <article>
      <h2>Delivery #{delivery.id}</h2>
      <p>Customer: {delivery.customerName ?? "—"}</p>
      <p>Address: {delivery.address ?? "—"}</p>
      <p>Status: {delivery.status ?? "Pending"}</p>

      {onUpdateStatus && (
        <button
          type="button"
          onClick={() => onUpdateStatus(delivery)}
        >
          Update status
        </button>
      )}
    </article>
  );
}