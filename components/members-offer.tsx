"use client";

import { FormEvent, useState } from "react";
import { DemoBadge } from "@/components/brand";
import { memberPerks } from "@/lib/content";
import { clearMember, useMember, writeMember } from "@/lib/member";

export function MembersOffer() {
  const member = useMember();
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (name.length < 2 || phone.length < 7) {
      setError("Need a name and a phone (7+ digits) for this DEMO account.");
      return;
    }
    writeMember({ name, phone, createdAt: new Date().toISOString() });
    setError("");
  }

  return (
    <section id="account" className="border-y border-line bg-paper-2/70 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Members</p>
          <DemoBadge>DEMO signup</DemoBadge>
        </div>
        <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Make an account. Keep the member price.
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Stays on this phone. No server. Unlocks the DEMO cut on digital and a
          faster same-day pack for physical.
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-3">
            {memberPerks.map((perk) => (
              <li key={perk.title} className="rounded-xl border border-line bg-panel px-4 py-3">
                <p className="font-medium">{perk.title}</p>
                <p className="mt-1 text-sm text-muted">{perk.detail}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
            {member ? (
              <div>
                <p className="text-xs tracking-wide text-muted uppercase">Signed in · DEMO</p>
                <p className="font-serif mt-1 text-xl font-semibold">{member.name}</p>
                <p className="mt-1 text-sm text-muted">{member.phone}</p>
                <p className="mt-3 text-sm">
                  Member rates are on. They show next to packs when you top up.
                </p>
                <button
                  type="button"
                  className="mt-4 text-sm text-rust underline-offset-4 hover:underline"
                  onClick={() => clearMember()}
                >
                  Sign out on this phone
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <label className="block text-sm">
                  <span className="text-muted">Name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-muted">Phone</span>
                  <input
                    name="phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="980…"
                    className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-3 text-base outline-none focus:border-ink"
                  />
                </label>
                {error ? <p className="text-sm text-rust">{error}</p> : null}
                <button
                  type="submit"
                  className="thumb-btn w-full rounded-full bg-pine px-4 text-sm font-semibold text-paper"
                >
                  Create DEMO account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
