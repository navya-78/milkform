import DeliveryCard from "../components/DeliveryCard";

export default function Deliveries({ deliveries = [], onView }) {
  return (
    <main>
      <h1>Deliveries</h1>
      {deliveries.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        deliveries.map((delivery) => (
          <DeliveryCard
            key={delivery.id}
            delivery={delivery}
            onView={onView}
          />
        ))
      )}
    </main>
  );
}