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

export const getComplaints = () => request("/api/complaints");

export const createComplaint = (data) =>
  request("/api/complaints", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getComplaintById = (id) =>
  request(`/api/complaints/${encodeURIComponent(id)}`);