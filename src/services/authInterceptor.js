const TOKEN_KEY = "dairy_farm_token";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function addAuthHeader(headers = {}) {
  const token = getAuthToken();

  return {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}