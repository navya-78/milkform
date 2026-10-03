export default function DeliveryBoyCard({ deliveryBoy }) {
  return (
    <article>
      <h2>{deliveryBoy.name}</h2>
      <p>Email: {deliveryBoy.email ?? "—"}</p>
      <p>Phone: {deliveryBoy.phone ?? "—"}</p>
      <p>Status: {deliveryBoy.status ?? "Active"}</p>
    </article>
  );
}