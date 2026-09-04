import { getHub, getPack, getPhysical, type Hub, type Pack } from "@/lib/catalog";
import { whatsAppHref } from "@/lib/content";
import { payHref, type SitePage } from "@/lib/routes";

export const mockWallets = [
  {
    id: "khalti" as const,
    name: "Khalti",
    label: "Mock Khalti",
    hint: "UI only — no Khalti API, no wallet debit.",
  },
  {
    id: "esewa" as const,
    name: "eSewa",
    label: "Mock eSewa",
    hint: "UI only — no eSewa API, no wallet debit.",
  },
] as const;

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

export function demoWhatsAppHref(hub: Hub, pack?: Pack, playerId?: string) {
  const bits = [`DEMO: I want ${hub.name}`];
  if (pack) bits.push(pack.label);
  if (playerId) bits.push(`${hub.idLabel} ${playerId}`);
  bits.push("Pepsicola Ward 32");
  return whatsAppHref(bits.join(" / "));
}

export function physicalWhatsAppHref(name: string) {
  return whatsAppHref(`DEMO: I want ${name} — same-day Pepsicola Ward 32`);
}

export function readDemoOrder(search: URLSearchParams) {
  const hub = getHub(search.get("hub"));
  const pack = hub ? getPack(hub, search.get("pack")) : undefined;
  const item = getPhysical(search.get("sku"));
  const pay = getMockWallet(search.get("pay"));
  const pid = (search.get("pid") ?? "").trim();
  const txn = (search.get("txn") ?? "").trim();
  return { hub, pack, item, pay, pid, txn };
}

export function physicalPayHref(from: SitePage, sku: string) {
  return payHref(from, { sku });
}
