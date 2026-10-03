const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Subscription request failed.");
  }

  return result;
}

export const getSubscriptions = () => request("/api/subscriptions");

export const getSubscriptionById = (id) =>
  request(`/api/subscriptions/${encodeURIComponent(id)}`);

export const createSubscription = (data) =>
  request("/api/subscriptions", {
    method: "POST",
    body: JSON.stringify(data),
  });