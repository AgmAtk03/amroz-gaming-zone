import catalogData from "@/data/catalog.json";

export type HubId = string;
export type CategoryId = "topups" | "vouchers" | "gift-cards" | "subscriptions" | "gear";

export type Pack = {
  id: string;
  label: string;
  amount: string;
  unit: string;
  price: string;
  memberPrice: string;
  popular?: boolean;
  marginRank: number;
};

export type FulfillMode = "uid" | "account" | "code";

export type Hub = {
  id: HubId;
  category: Exclude<CategoryId, "gear">;
  kind: string;
  name: string;
  short: string;
  blurb: string;
  idLabel: string;
  idHint: string;
  idPlaceholder: string;
  fulfillMode: FulfillMode;
  passwordLabel?: string;
  passwordWhy?: string;
  tone: "ember" | "sand" | "pine" | "teal" | "brick" | "ink" | "gold";
  fulfillment: string;
  photo: string;
  featured?: boolean;
  popular?: boolean;
  marginRank: number;
  mergedFrom?: readonly string[];
  packs: readonly Pack[];
};

export function hubNeedsPassword(hub: Hub) {
  return hub.fulfillMode === "account";
}

export function hubNeedsGameId(hub: Hub) {
  return hub.fulfillMode !== "code";
}

export const catalogCategories = catalogData.categories as {
  id: CategoryId;
  label: string;
  blurb: string;
}[];

export const hubs: readonly Hub[] = catalogData.hubs as Hub[];
export const featuredHubs = hubs.filter((hub) => hub.featured);

export function hubsInCategory(cat: string | null | undefined) {
  if (!cat || cat === "all") return hubs;
  return hubs.filter((hub) => hub.category === cat);
}

export type PhysicalKind = "fantech" | "ps5" | "controller" | "accessory";
export type StockLevel = "in" | "low" | "ask";

export type PhysicalItem = {
  id: string;
  sku: string;
  name: string;
  kind: string;
  group: PhysicalKind;
  blurb: string;
  price: string;
  memberPrice: string;
  for: string;
  photo: string;
  stock: StockLevel;
  qty?: number;
  marginRank: number;
  popular?: boolean;
};

export const physical: readonly PhysicalItem[] = [
  {
    id: "ft-wireless",
    sku: "Fantech UX2",
    name: "Fantech wireless entry",
    kind: "Wireless mouse",
    group: "fantech",
    blurb: "Light, bag-friendly. The everyday wireless we keep on the counter.",
    price: "1,499",
    memberPrice: "1,424",
    for: "PC",
    photo: "/images/gear-mouse.jpg",
    stock: "in",
    qty: 6,
    marginRank: 2,
    popular: true,
  },
  {
    id: "ft-rgb",
    sku: "Fantech X16",
    name: "Fantech wired RGB mid",
    kind: "Wired RGB mouse",
    group: "fantech",
    blurb: "Cable you will not lose. RGB if the desk wants it.",
    price: "1,799",
    memberPrice: "1,709",
    for: "PC",
    photo: "/images/gear-rgb.jpg",
    stock: "in",
    qty: 4,
    marginRank: 3,
  },
  {
    id: "ft-atom87",
    sku: "Fantech ATOM 87",
    name: "Fantech ATOM 87",
    kind: "TKL keyboard",
    group: "fantech",
    blurb: "Eighty-seven keys. Hot-swap. Confirm the switch on chat.",
    price: "4,499",
    memberPrice: "4,274",
    for: "PC",
    photo: "/images/gear-keyboard.jpg",
    stock: "low",
    qty: 2,
    marginRank: 1,
    popular: true,
  },
  {
    id: "ft-orbit",
    sku: "Fantech HG25 Orbit",
    name: "Fantech Orbit headset",
    kind: "Headset",
    group: "fantech",
    blurb: "Wired, mic on a stick. Booth or home. No app.",
    price: "2,199",
    memberPrice: "2,089",
    for: "PC / console",
    photo: "/images/gear-headset.jpg",
    stock: "in",
    qty: 5,
    marginRank: 4,
  },
  {
    id: "ft-shooter",
    sku: "Fantech Shooter II GP13",
    name: "Shooter II / GP13",
    kind: "Mouse + pad",
    group: "fantech",
    blurb: "Shooter II mouse with the GP13 pad as a set.",
    price: "1,999",
    memberPrice: "1,899",
    for: "PC",
    photo: "/images/gear-set.jpg",
    stock: "in",
    qty: 3,
    marginRank: 5,
  },
  {
    id: "ps5-dualsense",
    sku: "DualSense",
    name: "PS5 DualSense",
    kind: "Controller",
    group: "ps5",
    blurb: "White pad for the living-room PS5. Stock swings — ask first.",
    price: "8,499",
    memberPrice: "8,074",
    for: "PS5",
    photo: "/images/gear-dualsense.jpg",
    stock: "low",
    qty: 1,
    marginRank: 6,
    popular: true,
  },
  {
    id: "ps5-console",
    sku: "PS5 console",
    name: "PS5 console",
    kind: "Console",
    group: "ps5",
    blurb: "Disc console for the living room. Ask first — stock moves fast.",
    price: "89,900",
    memberPrice: "87,900",
    for: "PS5",
    photo: "/images/gear-ps5-console.jpg",
    stock: "ask",
    marginRank: 9,
    popular: true,
  },
  {
    id: "gta6-preorder",
    sku: "GTA 6 pre-order",
    name: "GTA 6 pre-order",
    kind: "Pre-order",
    group: "ps5",
    blurb: "Hold a copy. We ping you when it drops. Pay now, pick up later.",
    price: "8,999",
    memberPrice: "8,549",
    for: "PS5",
    photo: "/images/gear-gta6.jpg",
    stock: "in",
    qty: 5,
    marginRank: 5,
    popular: true,
  },
  {
    id: "ps5-dock",
    sku: "PS5 charge dock",
    name: "PS5 charge dock",
    kind: "Dock",
    group: "ps5",
    blurb: "Two pads, one brick. 2 hour delivery if it is on the shelf.",
    price: "3,299",
    memberPrice: "3,134",
    for: "PS5",
    photo: "/images/gear-ps5.jpg",
    stock: "ask",
    marginRank: 8,
  },
  {
    id: "pad-generic",
    sku: "Amroz pad",
    name: "Wireless gamepad",
    kind: "Controller",
    group: "controller",
    blurb: "PC, phone, and most consoles. The spare when DualSense is out.",
    price: "2,299",
    memberPrice: "2,184",
    for: "PC / phone / console",
    photo: "/images/gear-pad.jpg",
    stock: "in",
    qty: 4,
    marginRank: 3,
    popular: true,
  },
  {
    id: "phone-triggers",
    sku: "Phone triggers",
    name: "Phone trigger grips",
    kind: "Phone",
    group: "accessory",
    blurb: "Clip-on fires for Free Fire nights. Fits most mid-size phones.",
    price: "699",
    memberPrice: "664",
    for: "Phone",
    photo: "/images/gear-phone.jpg",
    stock: "in",
    qty: 8,
    marginRank: 1,
    popular: true,
  },
  {
    id: "usb-c-fan",
    sku: "Clip fan",
    name: "Phone clip cooler",
    kind: "Phone",
    group: "accessory",
    blurb: "USB-C fan for long ranked sessions. Pickup in two hours.",
    price: "1,199",
    memberPrice: "1,139",
    for: "Phone",
    photo: "/images/gear-cooler.jpg",
    stock: "low",
    qty: 2,
    marginRank: 7,
  },
  {
    id: "cable-pack",
    sku: "Cable pack",
    name: "Charge + USB-C pack",
    kind: "Cable",
    group: "accessory",
    blurb: "The cables people forget. PC, phone, pad.",
    price: "499",
    memberPrice: "474",
    for: "PC / phone / console",
    photo: "/images/gear-cables.jpg",
    stock: "in",
    qty: 12,
    marginRank: 2,
  },
];

export const physicalGroups: { id: PhysicalKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fantech", label: "Fantech" },
  { id: "ps5", label: "PS5" },
  { id: "controller", label: "Pads" },
  { id: "accessory", label: "Extras" },
];

export type Bundle = {
  id: string;
  name: string;
  blurb: string;
  price: string;
  memberPrice: string;
  hubId: HubId;
  packId: string;
  sku: string;
  photo: string;
};

export const bundles: readonly Bundle[] = [
  {
    id: "bundle-ff-mouse",
    name: "FF night kit",
    blurb: "310 diamonds + Fantech wireless. Credit now. Mouse in 2 hours.",
    price: "1,849",
    memberPrice: "1,756",
    hubId: "freefire",
    packId: "ff-310",
    sku: "ft-wireless",
    photo: "/images/gear-mouse.jpg",
  },
  {
    id: "bundle-ps-pad",
    name: "Pad + store credit",
    blurb: "Wireless pad + NPR 1,000 PS Store. One pay, two takes.",
    price: "3,149",
    memberPrice: "2,991",
    hubId: "psn",
    packId: "psn-1000",
    sku: "pad-generic",
    photo: "/images/gear-pad.jpg",
  },
];

export type TrendingKind = "hub" | "physical";

export type TrendingItem = {
  kind: TrendingKind;
  id: string;
  title: string;
};

export const trendingSeed: readonly TrendingItem[] = [
  { kind: "physical", id: "ps5-dualsense", title: "PS5" },
  { kind: "physical", id: "ps5-console", title: "PS5 console" },
  { kind: "physical", id: "gta6-preorder", title: "GTA 6 pre-order" },
  { kind: "hub", id: "freefire", title: "Free Fire" },
  { kind: "hub", id: "pubg", title: "PUBG UC" },
  { kind: "hub", id: "mlbb", title: "MLBB" },
  { kind: "hub", id: "steam", title: "Steam" },
  { kind: "hub", id: "psn", title: "PS Store" },
  { kind: "hub", id: "valorant", title: "Valorant" },
  { kind: "hub", id: "roblox", title: "Roblox" },
];

export function shuffleTrending<T>(list: readonly T[]): T[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
  }
  return next;
}

const hubById = Object.fromEntries(hubs.map((hub) => [hub.id, hub]));
const physicalById = Object.fromEntries(physical.map((item) => [item.id, item]));
const bundleById = Object.fromEntries(bundles.map((item) => [item.id, item]));

export function getHub(id: string | null | undefined): Hub | undefined {
  if (!id) return undefined;
  return hubById[id];
}

export function getPack(hub: Hub, packId: string | null | undefined) {
  if (!packId) return undefined;
  return hub.packs.find((pack) => pack.id === packId);
}

export function getPhysical(id: string | null | undefined) {
  if (!id) return undefined;
  return physicalById[id];
}

export function getBundle(id: string | null | undefined) {
  if (!id) return undefined;
  return bundleById[id];
}

export function stockLabel(level: StockLevel, qty?: number) {
  if (level === "in") return qty ? `In stock · ${qty}` : "In stock";
  if (level === "low") return qty ? `Low · ${qty}` : "Low stock";
  return "Ask the desk";
}

export const homePhysicalIds = [
  "ft-wireless",
  "ft-atom87",
  "ps5-dualsense",
  "pad-generic",
  "phone-triggers",
  "cable-pack",
] as const;

export const homeTrending = trendingSeed;

export const categories = catalogCategories;

export const gameChips = catalogCategories.map((cat) => ({
  id: cat.id,
  label: cat.label,
}));
