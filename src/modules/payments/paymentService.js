const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Payment request failed.");
  }

  return result;
}

export const getPayments = () => request("/api/payments");

export const getPaymentById = (id) =>
  request(`/api/payments/${encodeURIComponent(id)}`);

export const createPayment = (data) =>
  request("/api/payments", {
    method: "POST",
    body: JSON.stringify(data),
  });