import { addAuthHeader } from "./authInterceptor";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: addAuthHeader({
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? `Request failed (${response.status}).`);
  }

  return result;
}