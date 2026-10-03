export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function isRequired(value) {
  return String(value ?? "").trim().length > 0;
}

export function isPositiveNumber(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}