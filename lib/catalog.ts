import { shopPickup, whatsAppHref } from "@/lib/content";

export type Accent = "cyan" | "violet" | "magenta" | "amber";

export type GearSku = {
  sku: string;
  name: string;
  kind: string;
  blurb: string;
  npr: number;
  nprLabel: string;
  band: string;
  photo: string;
};

export type DigitalPack = {
  sku: string;
  label: string;
  amount: string;
  npr: number;
  nprLabel: string;
};

export type DigitalHub = {
  slug: string;
  name: string;
  short: string;
  currency: string;
  blurb: string;
  accent: Accent;
  idLabel: string;
  idHint: string;
  successKind: "topup" | "wallet" | "code";
  packs: DigitalPack[];
};

export type CheckoutItem = {
  sku: string;
  title: string;
  subtitle: string;
  npr: number;
  nprLabel: string;
  kind: "gear" | "topup" | "wallet";
  hub?: string;
  needsId: boolean;
  idLabel?: string;
  idHint?: string;
  successLine: string;
  waSku: string;
};

export const shopGear: GearSku[] = [
  {
    sku: "fantech-wireless-mouse",
    name: "Fantech wireless mouse (entry)",
    kind: "Mouse",
    blurb: "Wireless mouse for home or the bag.",
    npr: 999,
    nprLabel: "999",
    band: "~NPR 900–1100",
    photo:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=70",
  },
  {
    sku: "fantech-wired-rgb-mouse",
    name: "Fantech wired RGB mouse (mid)",
    kind: "Wired RGB mouse",
    blurb: "Wired, RGB, extra buttons.",
    npr: 1350,
    nprLabel: "1,350",
    band: "~NPR 1200–1500",
    photo:
      "https://images.unsplash.com/photo-1615663245857-ac12b7c1586d?auto=format&fit=crop&w=800&q=70",
  },
  {
    sku: "fantech-atom-87",
    name: "Fantech Atom 87 keyboard",
    kind: "Keyboard",
    blurb: "Ask on chat which switch is in stock.",
    npr: 2900,
    nprLabel: "2,900",
    band: "~NPR 2800–3000",
    photo:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=70",
  },
  {
    sku: "fantech-orbit-headset",
    name: "Fantech Orbit headset",
    kind: "Headset",
    blurb: "Wired headset. Mic on the boom.",
    npr: 1550,
    nprLabel: "1,550",
    band: "~NPR 1200–1900",
    photo:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=70",
  },
  {
    sku: "fantech-shooter-ii",
    name: "Fantech Shooter II / GP13 gamepad",
    kind: "Gamepad",
    blurb: "Spare pad when DualSense is taken.",
    npr: 2499,
    nprLabel: "2,499",
    band: "~NPR 2499",
    photo:
      "https://images.unsplash.com/photo-1592840496694-26d035b184cc?auto=format&fit=crop&w=800&q=70",
  },
];

export const digitalHubs: DigitalHub[] = [
  {
    slug: "freefire",
    name: "Free Fire",
    short: "FF diamonds",
    currency: "Diamonds",
    blurb: "Diamonds on your Player ID. Same-day / within 2 hours in Kathmandu.",
    accent: "amber",
    idLabel: "Free Fire Player ID",
    idHint: "UID from the profile card — sample only",
    successKind: "topup",
    packs: [
      { sku: "ff-110", label: "110 diamonds", amount: "110 diamonds", npr: 90, nprLabel: "90" },
      { sku: "ff-310", label: "310 diamonds", amount: "310 diamonds", npr: 240, nprLabel: "240" },
      { sku: "ff-520", label: "520 diamonds", amount: "520 diamonds", npr: 400, nprLabel: "400" },
      { sku: "ff-1080", label: "1080 diamonds", amount: "1080 diamonds", npr: 800, nprLabel: "800" },
    ],
  },
  {
    slug: "pubg",
    name: "PUBG Mobile",
    short: "PUBG UC",
    currency: "UC",
    blurb: "A few UC packs. Same mock pay as Free Fire.",
    accent: "amber",
    idLabel: "PUBG character ID",
    idHint: "ID under the avatar",
    successKind: "topup",
    packs: [
      { sku: "pubg-60", label: "60 UC", amount: "60 UC", npr: 80, nprLabel: "80" },
      { sku: "pubg-325", label: "325 UC", amount: "325 UC", npr: 400, nprLabel: "400" },
      { sku: "pubg-660", label: "660 UC", amount: "660 UC", npr: 800, nprLabel: "800" },
      { sku: "pubg-1800", label: "1800 UC", amount: "1800 UC", npr: 2000, nprLabel: "2,000" },
    ],
  },
  {
    slug: "mlbb",
    name: "Mobile Legends",
    short: "MLBB diamonds",
    currency: "Diamonds",
    blurb: "Nepal region only. Four sample packs.",
    accent: "cyan",
    idLabel: "MLBB ID + zone",
    idHint: "e.g. 123456789 (1234)",
    successKind: "topup",
    packs: [
      { sku: "mlbb-86", label: "86 diamonds", amount: "86 diamonds", npr: 160, nprLabel: "160" },
      { sku: "mlbb-172", label: "172 diamonds", amount: "172 diamonds", npr: 320, nprLabel: "320" },
      { sku: "mlbb-257", label: "257 diamonds", amount: "257 diamonds", npr: 480, nprLabel: "480" },
      { sku: "mlbb-706", label: "706 diamonds", amount: "706 diamonds", npr: 1280, nprLabel: "1,280" },
    ],
  },
  {
    slug: "valorant",
    name: "Valorant",
    short: "VP",
    currency: "Valorant Points",
    blurb: "Valorant Points. Riot ID in, credit pending.",
    accent: "magenta",
    idLabel: "Riot ID",
    idHint: "Name#TAG",
    successKind: "topup",
    packs: [
      { sku: "val-475", label: "475 VP", amount: "475 VP", npr: 400, nprLabel: "400" },
      { sku: "val-1000", label: "1000 VP", amount: "1000 VP", npr: 800, nprLabel: "800" },
      { sku: "val-2050", label: "2050 VP", amount: "2050 VP", npr: 1600, nprLabel: "1,600" },
      { sku: "val-3650", label: "3650 VP", amount: "3650 VP", npr: 2800, nprLabel: "2,800" },
    ],
  },
  {
    slug: "roblox",
    name: "Roblox",
    short: "Robux",
    currency: "Robux",
    blurb: "Robux on the username you type.",
    accent: "violet",
    idLabel: "Roblox username",
    idHint: "Exact username, not display name",
    successKind: "topup",
    packs: [
      { sku: "rbx-400", label: "400 Robux", amount: "400 Robux", npr: 500, nprLabel: "500" },
      { sku: "rbx-800", label: "800 Robux", amount: "800 Robux", npr: 1000, nprLabel: "1,000" },
      { sku: "rbx-1700", label: "1700 Robux", amount: "1700 Robux", npr: 2000, nprLabel: "2,000" },
      { sku: "rbx-4500", label: "4500 Robux", amount: "4500 Robux", npr: 5000, nprLabel: "5,000" },
    ],
  },
  {
    slug: "psn",
    name: "PlayStation Store",
    short: "PSN wallet",
    currency: "Wallet NPR",
    blurb: "PS Store wallet for PS5 / GTA. Not Steam.",
    accent: "cyan",
    idLabel: "PSN ID or email",
    idHint: "Account that needs the wallet credit",
    successKind: "wallet",
    packs: [
      { sku: "psn-500", label: "NPR 500 credit", amount: "NPR 500 PSN", npr: 500, nprLabel: "500" },
      { sku: "psn-1000", label: "NPR 1,000 credit", amount: "NPR 1,000 PSN", npr: 1000, nprLabel: "1,000" },
      { sku: "psn-2000", label: "NPR 2,000 credit", amount: "NPR 2,000 PSN", npr: 2000, nprLabel: "2,000" },
      { sku: "psn-5000", label: "NPR 5,000 credit", amount: "NPR 5,000 PSN", npr: 5000, nprLabel: "5,000" },
    ],
  },
  {
    slug: "steam",
    name: "Steam Wallet",
    short: "Steam USD",
    currency: "USD wallet",
    blurb: "Sample USD wallet amounts in NPR. DEMO only.",
    accent: "violet",
    idLabel: "Steam account / email",
    idHint: "Login email or Steam ID",
    successKind: "wallet",
    packs: [
      { sku: "steam-5", label: "USD 5", amount: "USD 5 Steam", npr: 750, nprLabel: "750" },
      { sku: "steam-10", label: "USD 10", amount: "USD 10 Steam", npr: 1500, nprLabel: "1,500" },
      { sku: "steam-20", label: "USD 20", amount: "USD 20 Steam", npr: 3000, nprLabel: "3,000" },
      { sku: "steam-50", label: "USD 50", amount: "USD 50 Steam", npr: 7500, nprLabel: "7,500" },
    ],
  },
];

export const memberSaveNote = "Members save 5% — join free";

export function hubBySlug(slug: string) {
  return digitalHubs.find((h) => h.slug === slug);
}

export function getCheckoutItem(sku: string): CheckoutItem | undefined {
  const gear = shopGear.find((g) => g.sku === sku);
  if (gear) {
    return {
      sku: gear.sku,
      title: gear.name,
      subtitle: `${gear.kind} · ${shopPickup.place}`,
      npr: gear.npr,
      nprLabel: gear.nprLabel,
      kind: "gear",
      needsId: false,
      successLine:
        "Pickup at Pepsicola / football ground. Pay was DEMO only — no gear delivery promised.",
      waSku: gear.name,
    };
  }

  for (const hub of digitalHubs) {
    const pack = hub.packs.find((p) => p.sku === sku);
    if (!pack) continue;
    const isWallet = hub.successKind === "wallet";
    return {
      sku: pack.sku,
      title: `${hub.name} · ${pack.label}`,
      subtitle: pack.amount,
      npr: pack.npr,
      nprLabel: pack.nprLabel,
      kind: isWallet ? "wallet" : "topup",
      hub: hub.slug,
      needsId: true,
      idLabel: hub.idLabel,
      idHint: hub.idHint,
      successLine: isWallet
        ? "Wallet / credit pending. Same-day · within 2 hours in Kathmandu (DEMO ticket)."
        : "Code/top-up pending · ID credit. Same-day · within 2 hours in Kathmandu.",
      waSku: `${hub.name} ${pack.label}`,
    };
  }
  return undefined;
}

export function shopConfirmHref(sku: string) {
  return whatsAppHref(`I want ${sku} / pickup Amroz Pepsicola football ground`);
}

export function checkoutWhatsAppHref(item: CheckoutItem, playerId?: string) {
  const idBit = playerId ? ` / ID ${playerId}` : "";
  return shopConfirmHref(`${item.waSku}${idBit}`);
}
