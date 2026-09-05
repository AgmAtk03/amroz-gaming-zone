"use client";

import { FormEvent, useState } from "react";
import { Photo } from "@/components/photo";
import { memberPerks } from "@/lib/content";
import { clearMember, isShopName, useMember, writeMember } from "@/lib/member";

export function MembersOffer() {
  const member = useMember();
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (name.length < 2 || phone.length < 7) {
      setError("Need a name and a phone (7+ digits).");
      return;
    }
    if (!isShopName(name)) {
      setError("Use the name you want on the account.");
      return;
    }
    writeMember({ name, phone, createdAt: new Date().toISOString() });
    setError("");
  }

  return (
    <section id="account" className="py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-40 lg:min-h-full">
              <Photo src="/images/hero.jpg" alt="Member counter at Amroz" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="relative p-5 sm:p-7">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">Members</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Member price on every top-up
              </h2>
              <p className="mt-2 text-sm text-muted">
                Saved on this phone. Applies on Buy again too.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {memberPerks.map((perk) => (
                  <li key={perk.title}>
                    <span className="font-medium">{perk.title}.</span>{" "}
                    <span className="text-muted">{perk.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                {member ? (
                  <div>
                    <p className="text-xs tracking-wide text-muted uppercase">Signed in</p>
                    <p className="mt-1 text-xl font-semibold">{member.name}</p>
                    <p className="mt-1 text-sm text-muted">{member.phone}</p>
                    <button
                      type="button"
                      className="mt-3 text-sm text-rust underline-offset-4 hover:underline"
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
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-3 text-base outline-none focus:border-gold"
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
                        className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-3 text-base outline-none focus:border-gold"
                      />
                    </label>
                    {error ? <p className="text-sm text-rust">{error}</p> : null}
                    <button
                      type="submit"
                      className="thumb-btn w-full rounded-xl bg-gold px-4 text-sm font-semibold text-paper"
                    >
                      Create account
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
