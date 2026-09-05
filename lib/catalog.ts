export type HubId =
  | "freefire"
  | "pubg"
  | "mlbb"
  | "valorant"
  | "roblox"
  | "psn"
  | "steam";

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

export type Hub = {
  id: HubId;
  kind: string;
  name: string;
  short: string;
  blurb: string;
  idLabel: string;
  idHint: string;
  idPlaceholder: string;
  tone: "ember" | "sand" | "pine" | "teal" | "brick" | "ink" | "gold";
  fulfillment: string;
  photo: string;
  popular?: boolean;
  marginRank: number;
  packs: readonly Pack[];
};

export const hubs: readonly Hub[] = [
  {
    id: "freefire",
    kind: "Diamonds",
    name: "Free Fire",
    short: "FF",
    blurb: "Diamonds on your UID. Instant Delivery.",
    idLabel: "Player ID",
    idHint: "Free Fire UID — digits only.",
    idPlaceholder: "123456789",
    tone: "ember",
    fulfillment: "Diamonds pending on this ID",
    photo: "/images/hub-freefire.jpg",
    popular: true,
    marginRank: 1,
    packs: [
      { id: "ff-100", label: "100 diamonds", amount: "100", unit: "diamonds", price: "150", memberPrice: "142", marginRank: 3 },
      { id: "ff-310", label: "310 diamonds", amount: "310", unit: "diamonds", price: "450", memberPrice: "427", popular: true, marginRank: 1 },
      { id: "ff-520", label: "520 diamonds", amount: "520", unit: "diamonds", price: "750", memberPrice: "712", popular: true, marginRank: 2 },
      { id: "ff-1080", label: "1,080 diamonds", amount: "1080", unit: "diamonds", price: "1,500", memberPrice: "1,425", marginRank: 4 },
    ],
  },
  {
    id: "pubg",
    kind: "UC",
    name: "PUBG UC",
    short: "PUBG",
    blurb: "UC on your character ID. Instant Delivery.",
    idLabel: "Character ID",
    idHint: "PUBG character ID — digits only.",
    idPlaceholder: "5123456789",
    tone: "sand",
    fulfillment: "UC pending on this ID",
    photo: "/images/hub-pubg.jpg",
    popular: true,
    marginRank: 2,
    packs: [
      { id: "pubg-60", label: "60 UC", amount: "60", unit: "UC", price: "150", memberPrice: "142", marginRank: 4 },
      { id: "pubg-325", label: "325 UC", amount: "325", unit: "UC", price: "750", memberPrice: "712", popular: true, marginRank: 1 },
      { id: "pubg-660", label: "660 UC", amount: "660", unit: "UC", price: "1,500", memberPrice: "1,425", marginRank: 2 },
      { id: "pubg-1800", label: "1,800 UC", amount: "1800", unit: "UC", price: "3,900", memberPrice: "3,705", marginRank: 3 },
    ],
  },
  {
    id: "mlbb",
    kind: "Diamonds",
    name: "MLBB",
    short: "ML",
    blurb: "MLBB diamonds. Instant Delivery.",
    idLabel: "Player ID",
    idHint: "Player ID. Zone ID optional.",
    idPlaceholder: "12345678 (1234)",
    tone: "gold",
    fulfillment: "Diamonds pending on this ID",
    photo: "/images/hub-mlbb.jpg",
    popular: true,
    marginRank: 3,
    packs: [
      { id: "mlbb-86", label: "86 diamonds", amount: "86", unit: "diamonds", price: "180", memberPrice: "171", marginRank: 3 },
      { id: "mlbb-172", label: "172 diamonds", amount: "172", unit: "diamonds", price: "360", memberPrice: "342", popular: true, marginRank: 1 },
      { id: "mlbb-344", label: "344 diamonds", amount: "344", unit: "diamonds", price: "720", memberPrice: "684", marginRank: 2 },
      { id: "mlbb-706", label: "706 diamonds", amount: "706", unit: "diamonds", price: "1,500", memberPrice: "1,425", marginRank: 4 },
    ],
  },
  {
    id: "valorant",
    kind: "VP",
    name: "Valorant",
    short: "VAL",
    blurb: "Valorant Points on your Riot ID. Instant Delivery.",
    idLabel: "Riot ID",
    idHint: "Name#TAG as you type it in-game.",
    idPlaceholder: "amroz#NP1",
    tone: "brick",
    fulfillment: "VP pending on this Riot ID",
    photo: "/images/hub-valorant.jpg",
    marginRank: 5,
    packs: [
      { id: "val-475", label: "475 VP", amount: "475", unit: "VP", price: "450", memberPrice: "427", popular: true, marginRank: 1 },
      { id: "val-1000", label: "1,000 VP", amount: "1000", unit: "VP", price: "900", memberPrice: "855", marginRank: 2 },
      { id: "val-2050", label: "2,050 VP", amount: "2050", unit: "VP", price: "1,800", memberPrice: "1,710", marginRank: 3 },
      { id: "val-3650", label: "3,650 VP", amount: "3650", unit: "VP", price: "3,200", memberPrice: "3,040", marginRank: 4 },
    ],
  },
  {
    id: "roblox",
    kind: "Robux",
    name: "Roblox",
    short: "RBX",
    blurb: "Robux on the username. Instant Delivery.",
    idLabel: "Roblox username",
    idHint: "Exact username — not the display name.",
    idPlaceholder: "amroz_player",
    tone: "teal",
    fulfillment: "Robux pending on this username",
    photo: "/images/hub-roblox.jpg",
    marginRank: 6,
    packs: [
      { id: "rbx-80", label: "80 Robux", amount: "80", unit: "Robux", price: "160", memberPrice: "152", marginRank: 3 },
      { id: "rbx-400", label: "400 Robux", amount: "400", unit: "Robux", price: "750", memberPrice: "712", popular: true, marginRank: 1 },
      { id: "rbx-800", label: "800 Robux", amount: "800", unit: "Robux", price: "1,450", memberPrice: "1,377", marginRank: 2 },
      { id: "rbx-1700", label: "1,700 Robux", amount: "1700", unit: "Robux", price: "2,900", memberPrice: "2,755", marginRank: 4 },
    ],
  },
  {
    id: "psn",
    kind: "Wallet",
    name: "PS Store",
    short: "PS",
    blurb: "PlayStation Store credit. Instant Delivery.",
    idLabel: "PSN Online ID",
    idHint: "Account the store credit should land on.",
    idPlaceholder: "amroz_psn",
    tone: "ink",
    fulfillment: "Store credit pending · code or account",
    photo: "/images/hub-psn.jpg",
    popular: true,
    marginRank: 4,
    packs: [
      { id: "psn-500", label: "NPR 500 credit", amount: "500", unit: "wallet", price: "500", memberPrice: "475", marginRank: 3 },
      { id: "psn-1000", label: "NPR 1,000 credit", amount: "1000", unit: "wallet", price: "1,000", memberPrice: "950", popular: true, marginRank: 1 },
      { id: "psn-2000", label: "NPR 2,000 credit", amount: "2000", unit: "wallet", price: "2,000", memberPrice: "1,900", marginRank: 2 },
      { id: "psn-5000", label: "NPR 5,000 credit", amount: "5000", unit: "wallet", price: "5,000", memberPrice: "4,750", marginRank: 4 },
    ],
  },
  {
    id: "steam",
    kind: "USD wallet",
    name: "Steam USD",
    short: "STM",
    blurb: "Steam USD wallet code. Instant Delivery.",
    idLabel: "Steam username",
    idHint: "Account name the wallet code is for.",
    idPlaceholder: "amroz_steam",
    tone: "pine",
    fulfillment: "Steam USD code pending",
    photo: "/images/hub-steam.jpg",
    marginRank: 7,
    packs: [
      { id: "stm-5", label: "$5 USD", amount: "5", unit: "USD", price: "750", memberPrice: "712", popular: true, marginRank: 1 },
      { id: "stm-10", label: "$10 USD", amount: "10", unit: "USD", price: "1,450", memberPrice: "1,377", marginRank: 2 },
      { id: "stm-20", label: "$20 USD", amount: "20", unit: "USD", price: "2,850", memberPrice: "2,707", marginRank: 3 },
      { id: "stm-50", label: "$50 USD", amount: "50", unit: "USD", price: "6,900", memberPrice: "6,555", marginRank: 4 },
    ],
  },
] as const;

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
    id: "ps5-dock",
    sku: "PS5 charge dock",
    name: "PS5 charge dock",
    kind: "Dock",
    group: "ps5",
    blurb: "Two pads, one brick. Same-day if it is on the shelf.",
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
    blurb: "310 diamonds + Fantech wireless. Dual take — digital now, mouse same-day.",
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

export type TrendingPack = {
  hubId: HubId;
  packId: string;
};

export const trendingPacks: readonly TrendingPack[] = [
  { hubId: "freefire", packId: "ff-310" },
  { hubId: "pubg", packId: "pubg-325" },
  { hubId: "mlbb", packId: "mlbb-172" },
  { hubId: "valorant", packId: "val-475" },
  { hubId: "psn", packId: "psn-1000" },
  { hubId: "roblox", packId: "rbx-400" },
];

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

export const homeTrending = trendingPacks.slice(0, 5);

export const categories = [
  { id: "digital", label: "Instant Delivery", href: "#topups" },
  { id: "gear", label: "Gaming gear", href: "#shelf" },
] as const;

export const gameChips = [
  { id: "freefire", label: "Free Fire" },
  { id: "pubg", label: "PUBG" },
  { id: "mlbb", label: "MLBB" },
  { id: "valorant", label: "Valorant" },
  { id: "roblox", label: "Roblox" },
  { id: "psn", label: "PS Store" },
  { id: "steam", label: "Steam" },
] as const;
