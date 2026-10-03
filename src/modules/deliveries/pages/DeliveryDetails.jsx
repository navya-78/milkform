export default function DeliveryDetails({ delivery }) {
  if (!delivery) return <p>Delivery not found.</p>;

  return (
    <main>
      <h1>Delivery #{delivery.id}</h1>
      <p>Customer: {delivery.customerName ?? "—"}</p>
      <p>Address: {delivery.address ?? "—"}</p>
      <p>Status: {delivery.status ?? "Pending"}</p>
      {delivery.scheduledAt && (
        <p>Scheduled: {new Date(delivery.scheduledAt).toLocaleString()}</p>
      )}
    </main>
  );
}