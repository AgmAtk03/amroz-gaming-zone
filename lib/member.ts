import { useSyncExternalStore } from "react";

export type Member = {
  name: string;
  phone: string;
  createdAt: string;
};

const KEY = "amroz-member-v1";
const LEGACY_KEYS = ["amroz-member-demo"] as const;
const EVENT = "amroz-member";

let snapshotRaw: string | null = null;
let snapshot: Member | null = null;
let swept = false;

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

/** QA leftovers like "QA Demo Member" must never render on the shop. */
export function isShopName(name: string) {
  const n = name.trim();
  if (n.length < 2) return false;
  return !/\b(qa|demo|sample|mock|walkthrough)\b/i.test(n);
}

function parseMember(raw: string | null): Member | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Member;
    if (!parsed?.name || !parsed?.phone) return null;
    if (!isShopName(parsed.name)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function sweepLegacy() {
  if (swept || typeof window === "undefined") return;
  swept = true;
  for (const key of LEGACY_KEYS) {
    window.localStorage.removeItem(key);
  }
  const current = parseMember(window.localStorage.getItem(KEY));
  if (!current) window.localStorage.removeItem(KEY);
}

export function readMember(): Member | null {
  if (typeof window === "undefined") return null;
  sweepLegacy();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === snapshotRaw) return snapshot;
    snapshotRaw = raw;
    snapshot = parseMember(raw);
    if (raw && !snapshot) window.localStorage.removeItem(KEY);
    return snapshot;
  } catch {
    snapshotRaw = null;
    snapshot = null;
    return null;
  }
}

export function writeMember(member: Member) {
  if (!isShopName(member.name)) return;
  window.localStorage.setItem(KEY, JSON.stringify(member));
  snapshotRaw = null;
  emit();
}

export function clearMember() {
  window.localStorage.removeItem(KEY);
  for (const key of LEGACY_KEYS) {
    window.localStorage.removeItem(key);
  }
  snapshotRaw = null;
  snapshot = null;
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

export function useMember() {
  return useSyncExternalStore(subscribe, readMember, () => null);
}
