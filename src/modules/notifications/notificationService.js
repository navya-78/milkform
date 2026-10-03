const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Notification request failed.");
  }

  return result;
}

export const getNotifications = () => request("/api/notifications");

export const markNotificationAsRead = (id) =>
  request(`/api/notifications/${encodeURIComponent(id)}/read`, {
    method: "PATCH",
  });