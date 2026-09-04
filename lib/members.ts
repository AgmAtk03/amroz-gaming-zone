export const MEMBERS_KEY = "amroz-members-demo";

export type MemberLead = {
  email: string;
  phone: string;
  at: string;
};

export function readMemberLeads(): MemberLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MEMBERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MemberLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMemberLead(lead: Omit<MemberLead, "at">) {
  const next: MemberLead = { ...lead, at: new Date().toISOString() };
  const prev = readMemberLeads();
  window.localStorage.setItem(MEMBERS_KEY, JSON.stringify([...prev, next]));
  window.localStorage.setItem(`${MEMBERS_KEY}-joined`, "1");
  return next;
}

export function hasJoinedMembers() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(`${MEMBERS_KEY}-joined`) === "1";
}

export function clearJoinedMembers() {
  window.localStorage.removeItem(`${MEMBERS_KEY}-joined`);
}
