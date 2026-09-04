export const site = {
  name: "Amroz Gaming Zone",
  shortName: "Amroz",
  tagline: "Ward 32’s late-night PS club.",
  city: "Kathmandu",
  ward: "Ward 32",
  areaHint: "Naya Baneshwor / Minbhawan corridor",
  addressLine: "Ward 32, Kathmandu Metropolitan City",
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
  mapsQuery: "27.6935,85.3425",
  mapsEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=85.328%2C27.684%2C85.357%2C27.703&layer=mapnik&marker=27.6935%2C85.3425",
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
  { href: "#membership", label: "Membership" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#visit", label: "Visit" },
] as const;

export function whatsAppHref(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function shopConfirmHref(sku: string) {
  return whatsAppHref(`I want ${sku} / pickup at Amroz`);
}

export const shopPickup = {
  place: "Pepsicola / football ground",
  line: "Confirm on WhatsApp, then pick up at Pepsicola by the football ground — street-side counter, not a Ward 32 booth hold.",
} as const;

export const shopGear = [
  {
    sku: "Fantech Raigor III",
    name: "Fantech Raigor III",
    kind: "Mouse",
    blurb: "Light wireless mouse for ranked nights and the bag home.",
    price: "1,499",
    accent: "cyan" as const,
  },
  {
    sku: "Fantech THOR II X16 V2",
    name: "Fantech THOR II X16 V2",
    kind: "Wired RGB mouse",
    blurb: "Wired RGB, macro buttons — the counter staple when wireless dies.",
    price: "1,799",
    accent: "violet" as const,
  },
  {
    sku: "Fantech ATOM 63 MK874V2",
    name: "Fantech ATOM 63",
    kind: "Atom keyboard",
    blurb: "60% ATOM board. Compact, hot-swap, RGB. Confirm switch color on chat.",
    price: "2,999",
    accent: "magenta" as const,
  },
  {
    sku: "Fantech HG25 Orbit",
    name: "Fantech HG25 Orbit",
    kind: "Headset",
    blurb: "Wired headset for booth or home. Mic on a stick, no app required.",
    price: "2,199",
    accent: "cyan" as const,
  },
  {
    sku: "Fantech Revolver II WGP12",
    name: "Fantech Revolver II WGP12",
    kind: "Gamepad",
    blurb: "Wireless pad for FC nights when the DualSense is already claimed.",
    price: "2,299",
    accent: "violet" as const,
  },
] as const;

export const shopTopup = {
  sku: "Free Fire top-up",
  name: "Free Fire top-up",
  kind: "Diamonds",
  blurb: "One hub — send your player ID and diamond pack on WhatsApp. We confirm stock before you travel.",
} as const;

export const shopSteam = {
  name: "Steam wallet",
  note: "Coming soon. Ask on chat if you still need a code — we are not listing packs yet.",
} as const;

export const games = [
  {
    title: "PS5 Duals",
    blurb: "4K screens, DualSense haptics, and the titles everyone actually queues for.",
    tags: ["FC 26", "GTA V", "UFC 5"],
    accent: "cyan" as const,
  },
  {
    title: "PC Arena",
    blurb: "High-refresh pods for ranked nights — mouse, headset, and a clean desk.",
    tags: ["Valorant", "Warzone", "CS2"],
    accent: "violet" as const,
  },
  {
    title: "Football nights",
    blurb: "Couch rivalries, club friendlies, and our monthly Ward Cup on the big panel.",
    tags: ["FC 26", "eFootball"],
    accent: "magenta" as const,
  },
  {
    title: "Fighters",
    blurb: "Tekken 8 and UFC 5 on rotation. Bring a rival. Leave with a clip.",
    tags: ["Tekken 8", "UFC 5"],
    accent: "cyan" as const,
  },
  {
    title: "Shooters",
    blurb: "Battle royale and tactical nights — party chat friendly, no griefing the lobby.",
    tags: ["Fortnite", "COD"],
    accent: "violet" as const,
  },
  {
    title: "Racing & sim",
    blurb: "Gran Turismo and arcade racers when you want speed without the ranked stress.",
    tags: ["GT7", "NFS"],
    accent: "magenta" as const,
  },
  {
    title: "Co-op lounge",
    blurb: "Split-screen, party games, and birthday energy. Soft lights, loud scoreboards.",
    tags: ["It Takes Two", "Party"],
    accent: "cyan" as const,
  },
  {
    title: "Gear counter",
    tags: ["Pads", "Headsets"],
    blurb: "Controllers, chargers, and headsets on-site — rent a spare or grab a cable.",
    accent: "violet" as const,
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
  { title: "PS5 booth row", caption: "Four duals, one soundtrack." },
  { title: "Night neon", caption: "Cyan on the glass after 9." },
  { title: "Tournament desk", caption: "Bracket sheets, cold drinks." },
  { title: "PC pods", caption: "Ranked-ready, cables managed." },
  { title: "Lounge corner", caption: "Wait your turn without standing." },
  { title: "Gear shelf", caption: "Pads, headsets, spare leads." },
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
    a: "Yes — Weekly Pulse, Monthly Squad, and a Weekend Spark pass. Hours don’t roll over. Pause requests for exams or travel: message us; we handle it case by case.",
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
    a: "Street and nearby lot parking around Ward 32 / Naya Baneshwor. Bike spots in front when the shutter’s up. Exact bay count is still a demo placeholder.",
  },
  {
    q: "How do I get in touch?",
    a: "WhatsApp +977 980-123-4567 (demo number), the form on this page, or walk up to the desk. We typically reply within an hour during open hours.",
  },
  {
    q: "Can I buy a mouse or Free Fire top-up?",
    a: "Yes — open Shop. Top-ups and PlayStation Store credit have a DEMO mock Khalti / eSewa path for owner review (sample NPR, not live pay). WhatsApp confirm is still the fallback. Gear can stay on chat or use a light Demo buy. Pickup at Pepsicola / football ground.",
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
      "Came for a Warzone session — pods are tight but the refresh rate is honest. Wish there were two more PCs. Still the best in Ward 32 for me.",
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
