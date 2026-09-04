"use client";

import { useSearchParams } from "next/navigation";
import { shopPickup } from "@/lib/content";
import {
  demoPayNotice,
  demoWhatsAppHref,
  getDemoHub,
  getMockWallet,
  readDemoOrder,
} from "@/lib/demo-pay";
import { checkoutHref, shopPageHref } from "@/lib/routes";

export function DemoSuccess() {
  const search = useSearchParams();
  const parsed = readDemoOrder(search);
  const sample = !parsed.hub || !parsed.pack || !parsed.pay;
  const hub = parsed.hub ?? getDemoHub("freefire");
  const pack = parsed.pack ?? hub?.packs[1] ?? hub?.packs[0];
  const pay = parsed.pay ?? getMockWallet("khalti");
  const pid = parsed.pid || "123456789";
  const ref = parsed.ref || "AMRZ-DEMO-PITCH";

  if (!hub || !pack || !pay) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold">Demo success</h1>
        <a
          href={shopPageHref("success")}
          className="mt-6 inline-flex rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-ink glow-btn"
        >
          Back to shop
        </a>
      </div>
    );
  }

  const wa = demoWhatsAppHref(hub, pack, pid);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-display text-xs tracking-[0.28em] text-cyan uppercase">
        Demo success
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {hub.fulfillment}
      </h1>
      <p className="mt-3 text-muted">
        Owner-pitch complete. This screen is the end of the mock path — no
        wallet was charged and no code was issued for real.
      </p>
      <p className="mt-2 text-xs text-magenta">{demoPayNotice}</p>
      {sample ? (
        <p className="mt-2 text-xs text-cyan">
          Sample receipt for the owner pitch — tap a shop pack to generate a
          fresh mock reference.
        </p>
      ) : null}

      <div className="neon-border relative mt-8 overflow-hidden rounded-3xl bg-panel p-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden">
          <div className="scan h-8 bg-gradient-to-b from-cyan/0 via-cyan/20 to-cyan/0" />
        </div>
        <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
          {hub.kind} · sample
        </p>
        <p className="mt-2 text-2xl font-semibold">{pack.label}</p>
        <p className="mt-1 font-display text-xl text-cyan">NPR {pack.price}</p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{hub.idLabel}</dt>
            <dd className="font-medium">{pid || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Wallet</dt>
            <dd className="font-medium">Mock {pay.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Reference</dt>
            <dd className="font-display text-cyan">{ref || "AMRZ-DEMO"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Fulfillment</dt>
            <dd className="text-right">code / top-up pending</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Collect</dt>
            <dd className="text-right">{shopPickup.place}</dd>
          </div>
        </dl>
        <p className="mt-6 rounded-xl border border-line bg-ink/50 px-3 py-2 text-xs text-muted">
          ID credit if the desk can push it. Otherwise pick up the code or
          confirm in person. WhatsApp remains the live fallback.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={wa}
          className="inline-flex justify-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-text hover:border-cyan"
        >
          WhatsApp fallback
        </a>
        <a
          href={shopPageHref("success")}
          className="inline-flex justify-center rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-ink glow-btn"
        >
          Back to shop
        </a>
        <a
          href={checkoutHref("success", hub.id)}
          className="text-center text-sm text-cyan underline-offset-4 hover:underline"
        >
          Run this path again
        </a>
      </div>
    </div>
  );
}
