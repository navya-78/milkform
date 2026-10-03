export function getStorageItem(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key) {
  localStorage.removeItem(key);
}