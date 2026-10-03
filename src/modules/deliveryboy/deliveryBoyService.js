const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Request failed.");
  }

  return result;
}

export const getAssignedDeliveries = () =>
  request("/api/delivery-boy/deliveries");

export const getDeliveryBoyProfile = () =>
  request("/api/delivery-boy/profile");

export const updateDeliveryStatus = (deliveryId, status) =>
  request(`/api/delivery-boy/deliveries/${encodeURIComponent(deliveryId)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });