const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Unable to load delivery data.");
  }

  return result;
}

export const getDeliveries = () => request("/api/deliveries");

export const getDeliveryById = (id) =>
  request(`/api/deliveries/${encodeURIComponent(id)}`);

export const getDeliveryHistory = () => request("/api/deliveries/history");