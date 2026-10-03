const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message ?? "Inventory request failed.");
  }

  return result;
}

export const getProducts = () => request("/api/products");

export const createProduct = (product) =>
  request("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

export const updateProduct = (id, changes) =>
  request(`/api/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });

export const deleteProduct = (id) =>
  request(`/api/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });