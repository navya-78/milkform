// DeliveryStatus.jsx
const statusLabels = {
  pending: "Pending",
  assigned: "Assigned",
  in_transit: "In transit",
  delivered: "Delivered",
  failed: "Failed",
};

export default function DeliveryStatus({ status }) {
  const label = statusLabels[status] ?? status ?? "Unknown";

  return <span aria-label={`Delivery status: ${label}`}>{label}</span>;
}