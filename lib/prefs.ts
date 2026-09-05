import { useSyncExternalStore } from "react";

export type ShopPrefs = {
  referral?: string;
  referralCredit?: number;
  restockNudge?: boolean;
  sla?: {
    sku: string;
    name: string;
    orderId: string;
    dueAt: number;
  };
};

const KEY = "amroz-prefs-v1";
const EVENT = "amroz-prefs";

const EMPTY_PREFS: ShopPrefs = {};
let snapshotRaw: string | null = null;
let snapshot: ShopPrefs = EMPTY_PREFS;

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

export function readPrefs(): ShopPrefs {
  if (typeof window === "undefined") return EMPTY_PREFS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === snapshotRaw) return snapshot;
    snapshotRaw = raw;
    snapshot = raw ? (JSON.parse(raw) as ShopPrefs) : EMPTY_PREFS;
    return snapshot;
  } catch {
    snapshotRaw = null;
    snapshot = EMPTY_PREFS;
    return EMPTY_PREFS;
  }
}

export function writePrefs(patch: Partial<ShopPrefs>) {
  const next = { ...readPrefs(), ...patch };
  snapshot = next;
  snapshotRaw = JSON.stringify(next);
  window.localStorage.setItem(KEY, snapshotRaw);
  emit();
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

export function usePrefs() {
  return useSyncExternalStore(subscribe, readPrefs, () => EMPTY_PREFS);
}
