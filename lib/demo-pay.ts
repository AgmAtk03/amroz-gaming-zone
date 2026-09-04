import { shopGear, shopPickup, whatsAppHref } from "@/lib/content";
import { checkoutHref, type SitePage } from "@/lib/routes";

export const demoPayBanner =
  "DEMO — sample prices for owner review · not live pay";

export const demoPayNotice =
  "Sample NPR for owner review. Not a live price list and not a real charge.";

export type DemoHubId = "freefire" | "pubg" | "mlbb" | "psn" | "gear";

export type DemoPack = {
  id: string;
  label: string;
  amount: string;
  unit: string;
  price: string;
};

export type DemoHub = {
  id: DemoHubId;
  kind: string;
  name: string;
  blurb: string;
  idLabel: string;
  idHint: string;
  idPlaceholder: string;
  accent: "cyan" | "violet" | "magenta";
  packs: readonly DemoPack[];
  fulfillment: string;
};

export const demoHubs: readonly DemoHub[] = [
  {
    id: "freefire",
    kind: "Diamonds",
    name: "Free Fire top-up",
    blurb: "Pick a sample diamond pack, send the player ID, mock-pay. Credit pending on the ID or pickup.",
    idLabel: "Player ID",
    idHint: "Free Fire UID — digits only in this demo.",
    idPlaceholder: "123456789",
    accent: "cyan",
    fulfillment: "Top-up pending · ID credit or counter pickup",
    packs: [
      { id: "ff-100", label: "100 diamonds", amount: "100", unit: "diamonds", price: "150" },
      { id: "ff-310", label: "310 diamonds", amount: "310", unit: "diamonds", price: "450" },
      { id: "ff-520", label: "520 diamonds", amount: "520", unit: "diamonds", price: "750" },
      { id: "ff-1080", label: "1,080 diamonds", amount: "1080", unit: "diamonds", price: "1,500" },
    ],
  },
  {
    id: "pubg",
    kind: "UC",
    name: "PUBG UC",
    blurb: "Thin sample card — UC packs for the owner pitch, same mock pay as Free Fire.",
    idLabel: "Player ID",
    idHint: "PUBG character ID for this sample path.",
    idPlaceholder: "5123456789",
    accent: "violet",
    fulfillment: "UC pending · ID credit or counter pickup",
    packs: [
      { id: "pubg-60", label: "60 UC", amount: "60", unit: "UC", price: "150" },
      { id: "pubg-325", label: "325 UC", amount: "325", unit: "UC", price: "750" },
      { id: "pubg-660", label: "660 UC", amount: "660", unit: "UC", price: "1,500" },
    ],
  },
  {
    id: "mlbb",
    kind: "Diamonds",
    name: "MLBB diamonds",
    blurb: "Mobile Legends sample diamonds. Not a mall — one game, a few denoms.",
    idLabel: "Player ID",
    idHint: "MLBB player ID (zone optional in this demo).",
    idPlaceholder: "12345678 (1234)",
    accent: "magenta",
    fulfillment: "Diamonds pending · ID credit or counter pickup",
    packs: [
      { id: "mlbb-86", label: "86 diamonds", amount: "86", unit: "diamonds", price: "180" },
      { id: "mlbb-172", label: "172 diamonds", amount: "172", unit: "diamonds", price: "360" },
      { id: "mlbb-706", label: "706 diamonds", amount: "706", unit: "diamonds", price: "1,500" },
    ],
  },
  {
    id: "psn",
    kind: "PlayStation Store credit",
    name: "PlayStation Store wallet",
    blurb: "PS5 / GTA money = PlayStation Store wallet credit. Not Steam. Sample NPR denoms.",
    idLabel: "PSN Online ID",
    idHint: "Account the PlayStation Store credit should land on.",
    idPlaceholder: "amroz_player",
    accent: "cyan",
    fulfillment: "PlayStation Store credit pending · code or ID credit",
    packs: [
      { id: "psn-500", label: "NPR 500 credit", amount: "500", unit: "wallet", price: "500" },
      { id: "psn-1000", label: "NPR 1,000 credit", amount: "1000", unit: "wallet", price: "1,000" },
      { id: "psn-2000", label: "NPR 2,000 credit", amount: "2000", unit: "wallet", price: "2,000" },
      { id: "psn-5000", label: "NPR 5,000 credit", amount: "5000", unit: "wallet", price: "5,000" },
    ],
  },
] as const;

export const demoGearHub: DemoHub = {
  id: "gear",
  kind: "Gear",
  name: "Counter gear",
  blurb: "Light demo buy for a Fantech SKU. Pickup at the counter — WhatsApp still works.",
  idLabel: "Name or WhatsApp",
  idHint: "Who should we hold the pad or board for?",
  idPlaceholder: "Sujan / 980…",
  accent: "violet",
  fulfillment: "Hold pending · pickup at the counter",
  packs: shopGear.map((item) => ({
    id: `gear-${item.sku.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: item.name,
    amount: item.sku,
    unit: item.kind,
    price: item.price,
  })),
};

const hubById: Record<string, DemoHub> = {
  ...Object.fromEntries(demoHubs.map((hub) => [hub.id, hub])),
  gear: demoGearHub,
};

export function getDemoHub(id: string | null | undefined): DemoHub | undefined {
  if (!id) return undefined;
  return hubById[id];
}

export function getDemoPack(hub: DemoHub, packId: string | null | undefined) {
  if (!packId) return undefined;
  return hub.packs.find((pack) => pack.id === packId);
}

export const mockWallets = [
  {
    id: "khalti" as const,
    name: "Khalti",
    label: "Mock Khalti",
    hint: "UI only — no Khalti API, no wallet debit.",
    tone: "violet" as const,
  },
  {
    id: "esewa" as const,
    name: "eSewa",
    label: "Mock eSewa",
    hint: "UI only — no eSewa API, no wallet debit.",
    tone: "cyan" as const,
  },
] as const;

export type MockWalletId = (typeof mockWallets)[number]["id"];

export function getMockWallet(id: string | null | undefined) {
  return mockWallets.find((wallet) => wallet.id === id);
}

export function demoWhatsAppHref(hub: DemoHub, pack?: DemoPack, playerId?: string) {
  const bits = [`DEMO review: I want ${hub.name}`];
  if (pack) bits.push(pack.label);
  if (playerId) bits.push(`${hub.idLabel} ${playerId}`);
  bits.push(`pickup at Amroz ${shopPickup.place}`);
  return whatsAppHref(bits.join(" / "));
}

export function readDemoOrder(search: URLSearchParams) {
  const hub = getDemoHub(search.get("hub"));
  const pack = hub ? getDemoPack(hub, search.get("pack")) : undefined;
  const pay = getMockWallet(search.get("pay"));
  const pid = (search.get("pid") ?? "").trim();
  const ref = (search.get("ref") ?? "").trim();
  return { hub, pack, pay, pid, ref };
}

export function makeDemoRef() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `AMRZ-DEMO-${stamp}`;
}

export function gearCheckoutHref(from: SitePage, sku: string) {
  const pack = demoGearHub.packs.find((item) => item.amount === sku);
  const base = checkoutHref(from, "gear");
  if (!pack) return base;
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}pack=${encodeURIComponent(pack.id)}`;
}
