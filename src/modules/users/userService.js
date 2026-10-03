const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "User request failed.");
  }

  return result;
}

export const getUsers = () => request("/api/users");

export const getUserById = (id) =>
  request(`/api/users/${encodeURIComponent(id)}`);

export const updateProfile = (id, changes) =>
  request(`/api/users/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });