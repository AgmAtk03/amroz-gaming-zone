"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { DemoChip } from "@/components/demo-banner";
import { memberPerks, site } from "@/lib/content";
import { clearJoinedMembers, hasJoinedMembers, saveMemberLead } from "@/lib/members";

const MEMBERS_EVENT = "amroz-members";

export function MembersSection() {
  const joined = useSyncExternalStore(
    (onChange) => {
      window.addEventListener(MEMBERS_EVENT, onChange);
      return () => window.removeEventListener(MEMBERS_EVENT, onChange);
    },
    hasJoinedMembers,
    () => false,
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    saveMemberLead({ email: email.trim(), phone: phone.trim() });
    window.dispatchEvent(new Event(MEMBERS_EVENT));
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Amroz Members (DEMO)")}&body=${encodeURIComponent(`Join list\nEmail: ${email}\nWhatsApp: ${phone}`)}`;

  return (
    <section id="members" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm text-muted">Amroz Members</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            Join the list (DEMO)
          </h2>
          <p className="mt-3 text-muted">
            Email and optional WhatsApp. Stored on this device only — no mailing
            tool.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {memberPerks.map((p) => (
              <li
                key={p.title}
                className="rounded-lg border border-line bg-panel p-4"
              >
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>

        {joined ? (
          <div
            className="rounded-lg border border-line bg-panel p-6 sm:p-8"
            role="status"
            aria-live="polite"
          >
            <DemoChip />
            <h3 className="mt-3 text-2xl font-semibold">
              You’re on the list — member perks unlocked (DEMO).
            </h3>
            <p className="mt-3 text-muted">
              Next visit, show this screen at the Pepsicola desk. Nothing left
              this device.
            </p>
            <button
              type="button"
              className="mt-6 text-sm text-cyan underline-offset-4 hover:underline"
              onClick={() => {
                clearJoinedMembers();
                window.dispatchEvent(new Event(MEMBERS_EVENT));
              }}
            >
              Add another lead
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-line bg-panel p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold">Join free</h3>
              <DemoChip />
            </div>
            <p className="mt-2 text-sm text-muted">
              Form POST stub: we only write localStorage. Optional mailto if
              you want a dummy send.
            </p>
            <label className="mt-6 block text-sm">
              <span className="text-muted">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-3 text-text outline-none focus:border-cyan"
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="text-muted">WhatsApp / phone (optional)</span>
              <input
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+977 …"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-3 text-text outline-none focus:border-cyan"
              />
            </label>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-white"
              >
                Join
              </button>
              <a
                href={mailto}
                className="text-center text-sm font-medium text-cyan underline-offset-4 hover:underline"
              >
                Or mailto stub
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
