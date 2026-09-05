export const site = {
  name: "Amroz Gaming Zone",
  shortName: "Amroz",
  tagline: "Instant Delivery top-ups. Same-day gear in Kathmandu.",
  city: "Kathmandu",
  ward: "Ward 32",
  area: "Pepsicola",
  addressLine: "Pepsicola, Ward 32, Kathmandu",
  country: "Nepal",
  phoneDisplay: "+977 980-123-4567",
  phoneTel: "+9779801234567",
  whatsapp: "9779801234567",
  email: "hello@amroz.example",
  hours: [
    { days: "Sun – Thu", time: "10:00 AM – 8:00 PM" },
    { days: "Fri – Sat", time: "10:00 AM – 9:00 PM" },
  ],
  mapsQuery: "Pepsicola Ward 32 Kathmandu",
  mapsEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=85.338%2C27.678%2C85.362%2C27.696&layer=mapnik&marker=27.6875%2C85.3502",
  social: [
    { name: "Facebook", href: "https://facebook.com/amrozgamingzone" },
    { name: "Instagram", href: "https://instagram.com/amrozgamingzone" },
    { name: "TikTok", href: "https://tiktok.com/@amrozgamingzone" },
    { name: "YouTube", href: "https://youtube.com/@amrozgamingzone" },
  ],
} as const;

export const nav = [
  { href: "#topups", label: "Top-ups" },
  { href: "#shelf", label: "Gear" },
  { href: "#contact", label: "Contact" },
] as const;

export function whatsAppHref(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const memberPerks = [
  {
    title: "Member price on top-ups",
    detail: "A small cut on diamonds, UC, and wallet credit — including Buy again.",
  },
  {
    title: "Same-day queue",
    detail: "Gear orders from members get packed first for the two-hour window.",
  },
  {
    title: "Weekend packs first",
    detail: "Offer drops land here before the public grid.",
  },
] as const;

export const trustSteps = [
  { n: "1", title: "Instant Delivery", detail: "Credit lands on your ID" },
  { n: "2", title: "eSewa & Khalti", detail: "Pay in NPR, then we send" },
  { n: "3", title: "UID only", detail: "No password. Save it once." },
] as const;

export const referralCodes = ["AMROZ", "WARD32", "SQUAD"] as const;
