export const defaultSiteSettings = {
  churchEmail: "saintmary@gmail.com",
  donationPhone: "9829071040",
  homeHeadline: "Saint Mary's Church CNI, Ajmer",
};

export function mergeSiteSettings(settings = {}) {
  const normalizedPhone = String(
    settings.donationPhone || defaultSiteSettings.donationPhone,
  ).replace(/\D/g, "");

  return {
    ...defaultSiteSettings,
    ...settings,
    donationPhone:
      normalizedPhone.length >= 10
        ? normalizedPhone.slice(-10)
        : normalizedPhone,
  };
}

export function getWhatsAppNumber(phoneNumber) {
  const fallbackNumber = defaultSiteSettings.donationPhone;
  const normalizedValue = String(phoneNumber || fallbackNumber).replace(/\D/g, "");

  if (!normalizedValue) {
    return String(fallbackNumber).replace(/\D/g, "");
  }

  if (normalizedValue.length === 10) {
    return `91${normalizedValue}`;
  }

  return normalizedValue;
}
