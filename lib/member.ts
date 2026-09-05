import { useSyncExternalStore } from "react";

export type Member = {
  name: string;
  phone: string;
  createdAt: string;
};

const KEY = "amroz-member-demo";
const EVENT = "amroz-member";

let snapshotRaw: string | null = null;
let snapshot: Member | null = null;

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

export function readMember(): Member | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === snapshotRaw) return snapshot;
    snapshotRaw = raw;
    if (!raw) {
      snapshot = null;
      return null;
    }
    const parsed = JSON.parse(raw) as Member;
    snapshot = parsed?.name && parsed?.phone ? parsed : null;
    return snapshot;
  } catch {
    snapshotRaw = null;
    snapshot = null;
    return null;
  }
}

export function writeMember(member: Member) {
  window.localStorage.setItem(KEY, JSON.stringify(member));
  emit();
}

export function clearMember() {
  window.localStorage.removeItem(KEY);
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
