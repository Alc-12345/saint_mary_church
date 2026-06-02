export function sanitizePhoneInput(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 10);
}

export function isValidPhoneNumber(value) {
  return /^\d{10}$/.test(String(value || ""));
}

export function isValidEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}
