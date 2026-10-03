import { useEffect, useState } from "react";
import TrackingMap from "../components/TrackingMap";
import { getLiveLocation } from "../trackingService";

export default function LiveTracking({ deliveryId }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!deliveryId) return;

    let active = true;

    getLiveLocation(deliveryId)
      .then((data) => {
        if (active) setLocation(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, [deliveryId]);

  return (
    <main>
      <h1>Live Tracking</h1>
      {error && <p role="alert">{error}</p>}
      {!error && !location && <p>Loading location...</p>}
      {location && (
        <TrackingMap
          latitude={location.latitude}
          longitude={location.longitude}
          label="Current delivery location"
        />
      )}
    </main>
  );
}