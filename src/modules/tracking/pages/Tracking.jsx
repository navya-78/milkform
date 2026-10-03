import TrackingMap from "../components/TrackingMap";

export default function Tracking({ delivery }) {
  if (!delivery) return <p>Delivery tracking not found.</p>;

  return (
    <main>
      <h1>Delivery Tracking</h1>
      <p>Delivery #{delivery.id}</p>
      <p>Status: {delivery.status ?? "Pending"}</p>
      <TrackingMap
        latitude={delivery.latitude}
        longitude={delivery.longitude}
      />
    </main>
  );
}