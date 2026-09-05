import { useSyncExternalStore } from "react";
import type { HubId } from "@/lib/catalog";

export const MAX_SAVED_IDS_PER_HUB = 5;

export type SavedGameId = {
  id: string;
  hubId: HubId;
  value: string;
  label: string;
  lastUsedAt: string | null;
  createdAt: string;
};

export type DigitalOrder = {
  id: string;
  hubId: HubId;
  packId: string;
  savedId: string;
  playerId: string;
  at: string;
  txn: string;
  orderId: string;
};

type Store = {
  ids: SavedGameId[];
  orders: DigitalOrder[];
};

const KEY = "amroz-saved-ids-v1";
const EVENT = "amroz-saved-ids";

const EMPTY_STORE: Store = { ids: [], orders: [] };
let snapshotRaw: string | null = null;
let snapshot: Store = EMPTY_STORE;

function emptyStore(): Store {
  return EMPTY_STORE;
}

function parseStore(raw: string | null): Store {
  if (!raw) return emptyStore();
  try {
    const parsed = JSON.parse(raw) as Partial<Store>;
    const ids = Array.isArray(parsed.ids) ? parsed.ids : [];
    const orders = Array.isArray(parsed.orders) ? parsed.orders : [];
    return { ids, orders };
  } catch {
    return emptyStore();
  }
}

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

function persist(next: Store) {
  snapshot = next;
  snapshotRaw = JSON.stringify(next);
  window.localStorage.setItem(KEY, snapshotRaw);
  emit();
}

export function readSavedStore(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === snapshotRaw) return snapshot;
    snapshotRaw = raw;
    snapshot = parseStore(raw);
    return snapshot;
  } catch {
    snapshotRaw = null;
    snapshot = emptyStore();
    return snapshot;
  }
}

export function maskGameId(value: string): string {
  const v = value.trim();
  if (!v) return "••••";
  if (v.length <= 3) return `${v[0]}${"•".repeat(v.length - 1)}`;
  if (v.length <= 6) return `${v.slice(0, 1)}${"•".repeat(v.length - 2)}${v.slice(-1)}`;
  const keep = 2;
  const mid = Math.min(6, v.length - keep * 2);
  return `${v.slice(0, keep)}${"•".repeat(mid)}${v.slice(-keep)}`;
}

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function listSavedIds(hubId: HubId): SavedGameId[] {
  return readSavedStore()
    .ids.filter((item) => item.hubId === hubId)
    .sort((a, b) => {
      const aUsed = a.lastUsedAt ?? a.createdAt;
      const bUsed = b.lastUsedAt ?? b.createdAt;
      return bUsed.localeCompare(aUsed);
    });
}

export function getSavedId(id: string | null | undefined): SavedGameId | undefined {
  if (!id) return undefined;
  return readSavedStore().ids.find((item) => item.id === id);
}

export function lastUsedSavedId(hubId: HubId): SavedGameId | undefined {
  const ids = listSavedIds(hubId);
  const used = ids.filter((item) => item.lastUsedAt);
  if (used.length) {
    return used.sort((a, b) => (b.lastUsedAt ?? "").localeCompare(a.lastUsedAt ?? ""))[0];
  }
  return ids[0];
}

export function addSavedId(
  hubId: HubId,
  value: string,
  label: string,
): { ok: true; saved: SavedGameId } | { ok: false; error: string } {
  const trimmed = value.trim();
  const tag = label.trim() || "main";
  if (trimmed.length < 3) return { ok: false, error: "ID needs 3+ characters." };
  if (tag.length > 16) return { ok: false, error: "Label stays under 16 characters." };
  const store = readSavedStore();
  const existing = store.ids.filter((item) => item.hubId === hubId);
  if (existing.length >= MAX_SAVED_IDS_PER_HUB) {
    return { ok: false, error: `Max ${MAX_SAVED_IDS_PER_HUB} IDs per hub. Delete one first.` };
  }
  const dup = existing.find((item) => item.value.toLowerCase() === trimmed.toLowerCase());
  if (dup) return { ok: true, saved: dup };
  const saved: SavedGameId = {
    id: uid(),
    hubId,
    value: trimmed,
    label: tag,
    lastUsedAt: null,
    createdAt: new Date().toISOString(),
  };
  persist({ ...store, ids: [...store.ids, saved] });
  return { ok: true, saved };
}

export function updateSavedId(
  id: string,
  patch: { value?: string; label?: string },
): { ok: true; saved: SavedGameId } | { ok: false; error: string } {
  const store = readSavedStore();
  const current = store.ids.find((item) => item.id === id);
  if (!current) return { ok: false, error: "Saved ID not found." };
  const value = (patch.value ?? current.value).trim();
  const label = (patch.label ?? current.label).trim() || "main";
  if (value.length < 3) return { ok: false, error: "ID needs 3+ characters." };
  if (label.length > 16) return { ok: false, error: "Label stays under 16 characters." };
  const saved = { ...current, value, label };
  persist({
    ...store,
    ids: store.ids.map((item) => (item.id === id ? saved : item)),
  });
  return { ok: true, saved };
}

export function deleteSavedId(id: string) {
  const store = readSavedStore();
  persist({ ...store, ids: store.ids.filter((item) => item.id !== id) });
}

export function markSavedIdUsed(id: string) {
  const store = readSavedStore();
  persist({
    ...store,
    ids: store.ids.map((item) =>
      item.id === id ? { ...item, lastUsedAt: new Date().toISOString() } : item,
    ),
  });
}

export function recordDigitalOrder(input: Omit<DigitalOrder, "id" | "at">) {
  const store = readSavedStore();
  const order: DigitalOrder = {
    ...input,
    id: uid(),
    at: new Date().toISOString(),
  };
  persist({ ...store, orders: [order, ...store.orders].slice(0, 20) });
  markSavedIdUsed(input.savedId);
  return order;
}

export function listRecentDigitalOrders(limit = 3): DigitalOrder[] {
  return readSavedStore().orders.slice(0, limit);
}

export function getDigitalOrder(id: string | null | undefined): DigitalOrder | undefined {
  if (!id) return undefined;
  return readSavedStore().orders.find((order) => order.id === id);
}

export function getDigitalOrderByTxn(txn: string | null | undefined): DigitalOrder | undefined {
  if (!txn) return undefined;
  return readSavedStore().orders.find((order) => order.txn === txn);
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

export function useSavedStore() {
  return useSyncExternalStore(subscribe, readSavedStore, emptyStore);
}
