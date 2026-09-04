export const speedCopy = {
  digitalShort: "Same-day · within 2 hours for digital codes / top-ups (Kathmandu).",
  gearFulfill:
    "Same-day delivery or pickup at Pepsicola / football ground",
} as const;

export const site = {
  name: "Amroz Gaming Zone",
  shortName: "Amroz",
  tagline: "PlayStation club in Pepsicola.",
  city: "Kathmandu",
  ward: "Pepsicola",
  areaHint: "Pepsicola / football ground",
  addressLine: "Pepsicola, by the football ground, Kathmandu",
  country: "Nepal",
  phoneDisplay: "+977 980-123-4567",
  phoneTel: "+9779801234567",
  whatsapp: "9779801234567",
  email: "play@amroz.example",
  hours: [
    { days: "Sun – Thu", time: "10:00 AM – 11:00 PM" },
    { days: "Fri – Sat", time: "10:00 AM – 12:30 AM" },
  ],
  walkIn: [
    { label: "PS5 booth", price: "NPR 199 / hr" },
    { label: "PC pod", price: "NPR 179 / hr" },
    { label: "Extra DualSense", price: "NPR 50 / hr" },
  ],
  mapsQuery: "27.6778,85.3615",
  mapsEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=85.346%2C27.668%2C85.377%2C27.688&layer=mapnik&marker=27.6778%2C85.3615",
  social: [
    { name: "Facebook", href: "https://facebook.com/amrozgamingzone" },
    { name: "Instagram", href: "https://instagram.com/amrozgamingzone" },
    { name: "TikTok", href: "https://tiktok.com/@amrozgamingzone" },
    { name: "YouTube", href: "https://youtube.com/@amrozgamingzone" },
  ],
} as const;

export const nav = [
  { href: "#play", label: "Play" },
  { href: "#shop", label: "Shop" },
  { href: "#members", label: "Members" },
  { href: "#membership", label: "Passes" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Floor" },
  { href: "#visit", label: "Visit" },
] as const;

export function whatsAppHref(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const shopPickup = {
  place: "Pepsicola / football ground",
  line: "Counter at Pepsicola, by the football ground. WhatsApp Confirm if you skip the DEMO pay path.",
} as const;

export const memberPerks = [
  {
    title: "5% off Fantech pickup",
    note: "Sample member cut on the five counter SKUs. DEMO — not a live coupon.",
  },
  {
    title: "Free Fire top-up bonus",
    note: "Join-week extra diamonds on the FF hub. Sample perk only.",
  },
  {
    title: "1 booth hour credit",
    note: "One PS5 hour after you land on the list. Desk would stamp this.",
  },
  {
    title: "Early tournament slots",
    note: "FC Cup and Tekken Friday hold a few seats for the list first.",
  },
] as const;

export const games = [
  {
    title: "PS5 Duals",
    blurb: "FC, GTA, UFC — the titles people actually wait for.",
    tags: ["FC 26", "GTA V", "UFC 5"],
  },
  {
    title: "PC pods",
    blurb: "A few ranked seats. Mouse and headset on the desk.",
    tags: ["Valorant", "Warzone", "CS2"],
  },
  {
    title: "Football nights",
    blurb: "Couch games and a monthly cup on the big screen.",
    tags: ["FC 26", "eFootball"],
  },
  {
    title: "Fighters",
    blurb: "Tekken 8 and UFC 5 on rotation.",
    tags: ["Tekken 8", "UFC 5"],
  },
  {
    title: "Shooters",
    blurb: "Party chat okay. Don’t grief the lobby.",
    tags: ["Fortnite", "COD"],
  },
  {
    title: "Racing",
    blurb: "GT and arcade racers when you want a break from ranked.",
    tags: ["GT7", "NFS"],
  },
  {
    title: "Co-op / birthday",
    blurb: "Split-screen and party games. Book two booths for groups.",
    tags: ["It Takes Two", "Party"],
  },
  {
    title: "Spare pads",
    tags: ["Pads", "Headsets"],
    blurb: "Rent a DualSense or grab a cable at the counter.",
  },
];

export const packages = [
  {
    name: "Weekly Pulse",
    cadence: "week",
    price: "1,999",
    save: "Save ~NPR 1,400 vs walk-in hours",
    popular: false,
    perks: [
      "8 hours of PS5 booth time",
      "1 snack or cold drink credit",
      "Weekend queue priority",
      "Member Discord / scoreboard access",
    ],
  },
  {
    name: "Monthly Squad",
    cadence: "month",
    price: "4,499",
    save: "Save ~NPR 6,000 vs walk-in hours",
    popular: true,
    perks: [
      "26 hours of PS5 booth time",
      "4 snack or drink credits",
      "1 tournament entry per month",
      "1 guest hour for a friend",
      "PC pod swap (subject to availability)",
    ],
  },
  {
    name: "Weekend Spark",
    cadence: "Sat–Sun",
    price: "899",
    save: "Best for exam-week bursts",
    popular: false,
    perks: [
      "6 hours across Saturday & Sunday",
      "1 snack credit",
      "Same-day booth hold (2 hrs)",
    ],
  },
];

export const events = [
  {
    title: "Amroz FC 26 Ward Cup",
    date: "Sat 19 Sep 2026",
    time: "11:00 AM – 6:00 PM",
    note: "16-player bracket. Entry NPR 500. Trophy + booth credit.",
    status: "Registrations open",
  },
  {
    title: "Tekken Friday Fights",
    date: "Every Friday",
    time: "8:00 PM – 11:00 PM",
    note: "Casual FT3, then a short king-of-the-hill. Walk-ins welcome.",
    status: "Weekly",
  },
  {
    title: "Warzone LAN Sunday",
    date: "Sun 4 Oct 2026",
    time: "2:00 PM – 8:00 PM",
    note: "PC pods reserved for a six-hour drop session. Squads of 3–4.",
    status: "Coming soon",
  },
];

export const gallery = [
  {
    title: "PS5 booths",
    caption: "Placeholder photo — real floor shots when we have them.",
    photo:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Controllers",
    caption: "Pads on the table, not a stock office.",
    photo:
      "https://images.unsplash.com/photo-1592840496694-26d035b184cc?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Headset shelf",
    caption: "Orbit and rentals at the counter.",
    photo:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "PC seats",
    caption: "Small row. Ask what’s free.",
    photo:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Waiting area",
    caption: "Sit while the booth finishes.",
    photo:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=70",
  },
  {
    title: "Keyboards",
    caption: "Fantech on the shelf.",
    photo:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=70",
  },
];

export const faqs = [
  {
    q: "What can I play at Amroz?",
    a: "PlayStation 5 booths with current sports, action, and co-op titles, plus a small PC arena for competitive shooters. Game list rotates — ask the desk what’s loaded tonight.",
  },
  {
    q: "What are your hours?",
    a: "Sunday–Thursday 10:00 AM to 11:00 PM. Friday and Saturday we stay open until 12:30 AM. Last booth start is 60 minutes before close.",
  },
  {
    q: "Do I need to book, or can I walk in?",
    a: "Walk-ins are welcome. Friday nights and tournament days fill up — WhatsApp or use the booking form to hold a booth. We hold a reservation for 15 minutes past the slot.",
  },
  {
    q: "How does pricing work?",
    a: "Walk-in is hourly (see the rate strip on this page). Weekly and monthly memberships bundle hours + snack credits at a lower effective rate. Tournaments may have a separate entry fee.",
  },
  {
    q: "Is there a membership?",
    a: "Two layers: Amroz Members is a free list (email + optional WhatsApp) with sample shop/booth perks — DEMO, stored on your device. Booth passes are Weekly Pulse, Monthly Squad, and Weekend Spark. Hours don’t roll over.",
  },
  {
    q: "Is food and drink allowed?",
    a: "Yes. We run a small snack and cold-drink counter. Outside food is okay if it stays off the hardware. No hookah on the demo menu — ask the floor if that changes.",
  },
  {
    q: "Do you host tournaments or birthdays?",
    a: "Weekly Tekken Fridays, seasonal FC cups, and private booth blocks for birthdays or office squads. Book 48 hours ahead for groups of 6+.",
  },
  {
    q: "Is it okay for younger players?",
    a: "Daytime is all-ages with a guardian for guests under 13. After 9 PM we keep the floor 16+ unless a parent stays. Rated-M titles stay on marked booths.",
  },
  {
    q: "Is there parking?",
    a: "Street parking around Pepsicola / the football ground. Bike spots in front when the shutter’s up. Exact bay count is still a demo placeholder.",
  },
  {
    q: "How do I get in touch?",
    a: "WhatsApp +977 980-123-4567 (demo number), the form on this page, or walk up to the desk. We typically reply within an hour during open hours.",
  },
  {
    q: "How fast are top-ups and gear?",
    a: "Digital codes and top-ups: same-day / within 2 hours in Kathmandu. Fantech gear: same-day delivery or pickup at Pepsicola / football ground — not a 2-hour window on hardware. Checkout on this site is DEMO only.",
  },
  {
    q: "Can I buy a mouse or Free Fire top-up?",
    a: "Yes — five Fantech SKUs and seven digital hubs (Free Fire, PUBG, MLBB, Valorant, Roblox, PSN, Steam USD). Owner-pitch checkout is mock Khalti/eSewa. WhatsApp Confirm is the fallback.",
  },
];

export const reviews = [
  {
    name: "Sujan K.",
    meta: "Monthly Squad · Baneshwor",
    quote:
      "Clean pads, no sticky controllers, and the FC nights actually start on time. Feels like a club, not a cyber cafe.",
    stars: 5,
  },
  {
    name: "Aayusha R.",
    meta: "Weekend Spark · Koteshwor",
    quote:
      "Booked a birthday dual for my brother. Staff set the party playlist and kept the queue fair. Will come back for Tekken Friday.",
    stars: 5,
  },
  {
    name: "Nirajan T.",
    meta: "Walk-in PC · Imadol",
    quote:
      "Came for a Warzone session — pods are tight but the refresh rate is honest. Wish there were two more PCs. Still the best Pepsicola floor for me.",
    stars: 4,
  },
  {
    name: "Pratiksha M.",
    meta: "Weekly Pulse · New Baneshwor",
    quote:
      "Hourly add-up used to hurt. The weekly pass pays for itself if you play twice after class. Lights are loud in a good way.",
    stars: 5,
  },
];
