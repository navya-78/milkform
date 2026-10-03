const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Schedule request failed.");
  }

  return result;
}

export const getSchedules = () => request("/api/schedules");

export const createSchedule = (data) =>
  request("/api/schedules", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteSchedule = (id) =>
  request(`/api/schedules/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });