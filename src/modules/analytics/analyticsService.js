const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export async function getAnalyticsSummary() {
  const response = await fetch(`${API_BASE_URL}/api/analytics`);

  if (!response.ok) {
    throw new Error("Unable to load analytics data.");
  }

  return response.json();
}