export const site = {
  name: "Amroz Gaming Zone",
  shortName: "Amroz",
  tagline: "Digital now. Physical today.",
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
  { href: "#account", label: "Account" },
  { href: "#shelf", label: "Physical" },
  { href: "#contact", label: "Contact" },
] as const;

export const demoPayBanner = "DEMO — sample prices · not live pay";

export const demoPayNotice =
  "Sample NPR for the walkthrough. Not a live price list and not a real charge.";

export function whatsAppHref(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const memberPerks = [
  {
    title: "Member price on digital",
    detail: "A small cut on top-ups once you are signed in. Shown as a DEMO rate.",
  },
  {
    title: "Same-day queue",
    detail: "Physical orders from members get packed first for the two-hour window.",
  },
  {
    title: "Offer drops",
    detail: "Weekend packs and leftover codes land here before the public grid.",
  },
] as const;
