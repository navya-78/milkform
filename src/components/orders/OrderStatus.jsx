// OrderStatus.jsx
const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderStatus({ status }) {
  const label = statusLabels[status] ?? status ?? "Unknown";

  return <span aria-label={`Order status: ${label}`}>{label}</span>;
}