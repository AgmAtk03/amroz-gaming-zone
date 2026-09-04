"use client";

import { useSearchParams } from "next/navigation";
import { DemoBadge } from "@/components/brand";
import { demoPayNotice } from "@/lib/content";
import {
  demoWhatsAppHref,
  physicalWhatsAppHref,
  readDemoOrder,
} from "@/lib/demo-pay";
import { payHref, shopPageHref } from "@/lib/routes";

export function PaySuccess() {
  const search = useSearchParams();
  const parsed = readDemoOrder(search);
  const sample = !parsed.pay || (!parsed.pack && !parsed.item) || !parsed.txn;

  const digital = parsed.hub && parsed.pack;
  const title = digital
    ? parsed.hub!.fulfillment
    : parsed.item
      ? "Held for same-day · Pepsicola Ward 32"
      : "DEMO receipt";

  const label = digital ? parsed.pack!.label : parsed.item?.name ?? "Sample pack";
  const price = digital ? parsed.pack!.price : parsed.item?.price ?? "—";
  const idLabel = digital ? parsed.hub!.idLabel : "Hold for";
  const pid = parsed.pid || (digital ? "123456789" : "Walk-in");
  const txn = parsed.txn || "AMRZ-DEMO-WALK";
  const payName = parsed.pay?.name ?? "Khalti";

  const wa = digital && parsed.hub
    ? demoWhatsAppHref(parsed.hub, parsed.pack, pid)
    : physicalWhatsAppHref(label);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">Demo success</p>
      <h1 className="font-serif mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        End of the mock path. No wallet was charged. Keep the transaction ID if
        you need to backtrack the story.
      </p>
      <p className="mt-1 text-xs text-muted">
        {demoPayNotice} <DemoBadge className="ml-1" />
      </p>
      {sample ? (
        <p className="mt-2 text-xs text-teal">
          Sample receipt — run a pack from the grid to mint a fresh ID.
        </p>
      ) : null}

      <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
        <p className="text-[11px] tracking-wide text-muted uppercase">
          {digital ? parsed.hub!.kind : parsed.item?.kind ?? "Receipt"}
        </p>
        <p className="mt-1 text-xl font-semibold">{label}</p>
        <p className="mt-1 text-sm">NPR {price}</p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{idLabel}</dt>
            <dd className="font-medium">{pid}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Wallet</dt>
            <dd className="font-medium">Mock {payName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Transaction ID</dt>
            <dd className="font-mono text-sm font-semibold tracking-wide">{txn}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Collect</dt>
            <dd className="text-right">
              {digital ? "ID credit · instant" : "Same-day · ≤ 2h · Pepsicola Ward 32"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={wa}
          className="thumb-btn inline-flex items-center justify-center rounded-full border border-line px-5 text-sm font-semibold"
        >
          WhatsApp fallback
        </a>
        <a
          href={shopPageHref("success")}
          className="thumb-btn inline-flex items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
        >
          Back to shop
        </a>
        <a
          href={digital && parsed.hub ? payHref("success", { hub: parsed.hub.id }) : shopPageHref("success")}
          className="text-center text-sm text-teal underline-offset-4 hover:underline"
        >
          Run again
        </a>
      </div>
    </div>
  );
}
