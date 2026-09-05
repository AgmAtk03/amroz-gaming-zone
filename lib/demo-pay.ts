import { getBundle, getHub, getPack, getPhysical, type Hub, type Pack } from "@/lib/catalog";
import { whatsAppHref } from "@/lib/content";
import { payHref, type SitePage } from "@/lib/routes";
import { maskGameId } from "@/lib/saved-ids";

export const mockWallets = [
  {
    id: "khalti" as const,
    name: "Khalti",
    label: "Mock Khalti",
    hint: "UI only — no Khalti API. Live pay after Cost/%.",
  },
  {
    id: "esewa" as const,
    name: "eSewa",
    label: "Mock eSewa",
    hint: "UI only — no eSewa API. Live pay after Cost/%.",
  },
] as const;

export const comingWallet = {
  id: "amroz" as const,
  name: "Amroz wallet",
  label: "Amroz prepaid · coming",
  hint: "DEMO — prepaid wallet after Cost/%. Not spendable in v1.",
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

export function demoWhatsAppHref(hub: Hub, pack?: Pack, playerId?: string) {
  const bits = [`DEMO: I want ${hub.name}`];
  if (pack) bits.push(pack.label);
  if (playerId) bits.push(`${hub.idLabel} ${maskGameId(playerId)}`);
  bits.push("Pepsicola Ward 32");
  return whatsAppHref(bits.join(" / "));
}

export function physicalWhatsAppHref(name: string) {
  return whatsAppHref(`DEMO: I want ${name} — same-day Pepsicola Ward 32`);
}

export function slaMissWhatsAppHref(name: string, orderId: string) {
  return whatsAppHref(
    `DEMO: 2h window missed for ${name} / ${orderId}. Please credit next digital top-up.`,
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
  return { hub, pack, item, bundle, pay, sid, txn, order };
}

export function physicalPayHref(from: SitePage, sku: string) {
  return payHref(from, { sku });
}
