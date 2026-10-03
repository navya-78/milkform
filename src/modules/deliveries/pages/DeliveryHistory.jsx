export default function DeliveryHistory({ deliveries = [] }) {
  return (
    <main>
      <h1>Delivery History</h1>
      {deliveries.length === 0 ? (
        <p>No delivery history found.</p>
      ) : (
        <ul>
          {deliveries.map((delivery) => (
            <li key={delivery.id}>
              Delivery #{delivery.id} — {delivery.status ?? "Unknown"}
              {delivery.deliveredAt &&
                ` — ${new Date(delivery.deliveredAt).toLocaleDateString()}`}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}