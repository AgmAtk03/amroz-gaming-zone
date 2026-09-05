export const INSTANT_DELIVERY = "Instant Delivery";
export const GEAR_DELIVERY = "2 Hour Delivery";

export function isInstantCategory(cat?: string | null) {
  return cat === "topups" || cat === "subscriptions";
}

export function categoryDeliveryLabel(cat?: string | null) {
  if (cat === "gear") return GEAR_DELIVERY;
  if (isInstantCategory(cat)) return INSTANT_DELIVERY;
  return null;
}

export const site = {
  name: "Amroz Gaming Zone",
  shortName: "Amroz",
  tagline: "Instant Delivery top-ups. 2 Hour Delivery gear in Kathmandu.",
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
    title: "Cheaper top-ups",
    detail: "A little less on diamonds, UC, and store credit — Buy again too.",
  },
  {
    title: "Gear packed first",
    detail: "Your 2 Hour Delivery jumps the regular queue.",
  },
  {
    title: "Weekend drops early",
    detail: "New packs show here before the public grid.",
  },
] as const;

export const trustSteps = [
  { n: "1", title: INSTANT_DELIVERY, detail: "Lands on your ID" },
  { n: "2", title: "eSewa & Khalti", detail: "Pay in NPR, then we send" },
  { n: "3", title: GEAR_DELIVERY, detail: "Pepsicola, Ward 32" },
] as const;

export const referralCodes = ["AMROZ", "WARD32", "SQUAD"] as const;

/** Physical floor at Pepsicola — separate from Instant Delivery shop. */
export const venue = {
  title: "Visit our game zone",
  place: "Pepsicola, Ward 32",
  placeLine: "Football ground area. Walk in, or hold a booth on WhatsApp.",
  hours: [
    { days: "Sun – Thu", time: "10:00 AM – 11:00 PM" },
    { days: "Fri – Sat", time: "10:00 AM – 12:30 AM" },
  ],
  rates: [
    { label: "PS5 booth", price: "NPR 199 / hr" },
    { label: "Extra pad", price: "NPR 50 / hr" },
    { label: "Weekly 8 hrs", price: "NPR 1,999" },
    { label: "Monthly 24 hrs", price: "NPR 3,999" },
  ],
  bookText: "Hi Amroz — hold a PS5 booth at Pepsicola (football ground).",
  bookLabel: "Book a booth on WhatsApp",
} as const;

export const venueSlides = [
  {
    id: "vibe",
    kicker: "The floor",
    title: "Neon on. Booths open.",
    line: "Walk in after class. Same Pepsicola block as the shop, by the football ground.",
    photo: "/images/gear-rgb.jpg",
    stamp: "Walk-in",
  },
  {
    id: "booths",
    kicker: "PS5 play",
    title: "Duals, 4K, one booth.",
    line: "NPR 199 an hour. Extra DualSense NPR 50. Pay at the desk.",
    photo: "/images/gear-ps5.jpg",
    stamp: "NPR 199/hr",
  },
  {
    id: "pass",
    kicker: "Come back",
    title: "Hours that cost less.",
    line: "Weekly 8 hours NPR 1,999. Monthly 24 hours NPR 3,999.",
    photo: "/images/gear-set.jpg",
    stamp: "Pass",
  },
  {
    id: "hold",
    kicker: "Hold a seat",
    title: "Friday fills up.",
    line: "WhatsApp us. We hold the booth 15 minutes past your slot.",
    photo: "/images/gear-dualsense.jpg",
    stamp: "Book",
  },
] as const;
