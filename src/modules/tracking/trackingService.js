const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function getLiveLocation(deliveryId) {
  const response = await fetch(
    `${API_BASE_URL}/api/deliveries/${encodeURIComponent(deliveryId)}/location`,
  );
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Unable to load delivery location.");
  }

  return result;
}