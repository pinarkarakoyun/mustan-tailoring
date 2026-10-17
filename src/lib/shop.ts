// Business information shown on the public site.
// DEMO VALUES: confirm address, phone, WhatsApp, email and hours with the owner (PRD §18).

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type OpeningHours = {
  day: Weekday;
  /** null = closed that day. Times as "HH:MM". */
  hours: { open: string; close: string } | null;
};

export const shop = {
  name: "Kledingreparatie Mustan",
  address: {
    street: "Voorbeeldstraat 1",
    postalCode: "1234 AB",
    city: "Voorbeeldstad",
  },
  /** Phone as shown to visitors. */
  phoneDisplay: "020 123 4567",
  /** Phone in international format, used for tel: links. */
  phone: "+31201234567",
  /** WhatsApp number in international format (digits only after +). */
  whatsapp: "+31612345678",
  email: "info@kledingreparatie-mustan.nl",
  openingHours: [
    { day: "mon", hours: null },
    { day: "tue", hours: { open: "09:00", close: "18:00" } },
    { day: "wed", hours: { open: "09:00", close: "18:00" } },
    { day: "thu", hours: { open: "09:00", close: "18:00" } },
    { day: "fri", hours: { open: "09:00", close: "18:00" } },
    { day: "sat", hours: { open: "10:00", close: "17:00" } },
    { day: "sun", hours: null },
  ] satisfies OpeningHours[],
};

export function shopAddressLine(): string {
  const { street, postalCode, city } = shop.address;
  return `${street}, ${postalCode} ${city}`;
}

/** Link that opens the address in Google Maps (no embedded map = no third-party cookies). */
export function shopMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopAddressLine())}`;
}

/** Opens a WhatsApp chat with the shop. */
export function shopWhatsAppUrl(): string {
  return `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`;
}
