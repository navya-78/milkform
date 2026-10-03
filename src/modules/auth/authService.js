const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function post(path, data) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Request failed.");
  }

  return result;
}

export const login = (data) => post("/api/auth/login", data);
export const register = (data) => post("/api/auth/register", data);
export const requestPasswordReset = (email) =>
  post("/api/auth/forgot-password", { email });
export const resetPassword = (data) =>
  post("/api/auth/reset-password", data);