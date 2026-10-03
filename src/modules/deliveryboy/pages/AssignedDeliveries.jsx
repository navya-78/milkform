import DeliveryTaskCard from "../components/DeliveryTaskCard";

export default function AssignedDeliveries({
  deliveries = [],
  onUpdateStatus,
}) {
  return (
    <main>
      <h1>Assigned Deliveries</h1>
      {deliveries.length === 0 ? (
        <p>No deliveries assigned.</p>
      ) : (
        deliveries.map((delivery) => (
          <DeliveryTaskCard
            key={delivery.id}
            delivery={delivery}
            onUpdateStatus={onUpdateStatus}
          />
        ))
      )}
    </main>
  );
}