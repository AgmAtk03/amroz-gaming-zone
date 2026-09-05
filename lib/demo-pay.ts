import { getBundle, getHub, getPack, getPhysical, type Hub, type Pack } from "@/lib/catalog";
import { whatsAppHref } from "@/lib/content";
import { payHref, type SitePage } from "@/lib/routes";
import { maskGameId } from "@/lib/saved-ids";

export const mockWallets = [
  {
    id: "khalti" as const,
    name: "Khalti",
    label: "Pay with Khalti",
    hint: "NPR · credit lands on your ID after pay.",
  },
  {
    id: "esewa" as const,
    name: "eSewa",
    label: "Pay with eSewa",
    hint: "NPR · credit lands on your ID after pay.",
  },
] as const;

export const comingWallet = {
  id: "amroz" as const,
  name: "Amroz wallet",
  label: "Amroz wallet · coming soon",
  hint: "Store credit on this phone. Ask the desk if you want it first.",
};

export type MockWalletId = (typeof mockWallets)[number]["id"];

export function getMockWallet(id: string | null | undefined) {
  return mockWallets.find((wallet) => wallet.id === id);
}

export function makeTxnId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      "",
    );
  return `AMRZ-${pick(4)}-${pick(4)}`;
}

export function makeOrderId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const pick = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join(
      "",
    );
  return `ORD-${pick(6)}`;
}

export function demoWhatsAppHref(
  hub: Hub,
  pack?: Pack,
  playerId?: string,
  region?: string,
) {
  const bits = [`Hi Amroz — I want ${hub.name}`];
  if (region) bits.push(region);
  if (pack) bits.push(pack.label);
  if (playerId) bits.push(`${hub.idLabel} ${maskGameId(playerId)}`);
  bits.push("Pepsicola Ward 32");
  return whatsAppHref(bits.join(" / "));
}

export function physicalWhatsAppHref(name: string) {
  return whatsAppHref(`Hi Amroz — I want ${name}. 2 Hour Delivery, Pepsicola Ward 32.`);
}

export function slaMissWhatsAppHref(name: string, orderId: string) {
  return whatsAppHref(
    `Hi Amroz — 2 Hour Delivery missed for ${name} / ${orderId}. Please credit the next top-up.`,
  );
}

export function readDemoOrder(search: URLSearchParams) {
  const hub = getHub(search.get("hub"));
  const pack = hub ? getPack(hub, search.get("pack")) : undefined;
  const item = getPhysical(search.get("sku"));
  const bundle = getBundle(search.get("bundle"));
  const pay = getMockWallet(search.get("pay"));
  const sid = (search.get("sid") ?? "").trim();
  const txn = (search.get("txn") ?? "").trim();
  const order = (search.get("order") ?? "").trim();
  const hold = (search.get("hold") ?? "").trim();
  return { hub, pack, item, bundle, pay, sid, txn, order, hold };
}

export function physicalPayHref(from: SitePage, sku: string) {
  return payHref(from, { sku });
}
