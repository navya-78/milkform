export default function TrackingMap({ latitude, longitude, label = "Delivery location" }) {
  if (latitude == null || longitude == null) {
    return <p>Location is not available.</p>;
  }

  return (
    <section aria-label={label}>
      <h2>{label}</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <a
        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="_blank"
        rel="noreferrer"
      >
        View on map
      </a>
    </section>
  );
}