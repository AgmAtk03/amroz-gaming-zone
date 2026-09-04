"use client";

import { useSyncExternalStore } from "react";
import { DemoPayBanner } from "@/components/demo-banner";
import { CHECKOUT_KEY } from "@/components/checkout-flow";
import { SpeedSuccess } from "@/components/speed-promise";
import { shopConfirmHref } from "@/lib/catalog";
import { shopPageHref } from "@/lib/routes";

type Stored = {
  sku: string;
  title: string;
  nprLabel: string;
  method: string;
  playerId: string;
  successLine: string;
  kind?: "gear" | "topup" | "wallet";
};

function readTicketRaw() {
  try {
    return window.sessionStorage.getItem(CHECKOUT_KEY);
  } catch {
    return null;
  }
}

export function CheckoutSuccess() {
  const raw = useSyncExternalStore(
    () => () => {},
    readTicketRaw,
    () => null,
  );
  let ticket: Stored | null = null;
  if (raw) {
    try {
      ticket = JSON.parse(raw) as Stored;
    } catch {
      ticket = null;
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:py-10">
      <DemoPayBanner />
      <p className="mt-6 text-sm text-muted">DEMO ticket</p>
      <h1 className="mt-1 text-3xl font-semibold">Payment recorded (not real)</h1>
      <p className="mt-3 text-muted">
        {ticket?.successLine ?? "Code/top-up pending · ID credit."}
      </p>
      <SpeedSuccess kind={ticket?.kind ?? "topup"} />
      {ticket ? (
        <dl className="mt-6 space-y-3 rounded-lg border border-line bg-panel p-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Item</dt>
            <dd className="text-right font-medium">{ticket.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Sample NPR</dt>
            <dd>{ticket.nprLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Wallet</dt>
            <dd className="uppercase">{ticket.method}</dd>
          </div>
          {ticket.playerId ? (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Player / account</dt>
              <dd>{ticket.playerId}</dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <p className="mt-6 text-sm text-muted">
          No ticket in this tab — still DEMO. Open shop and tap through again.
        </p>
      )}
      <div className="mt-8 flex flex-col gap-3">
        <a
          href={shopPageHref("done")}
          className="inline-flex justify-center rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-white"
        >
          Back to shop
        </a>
        <a
          href={shopConfirmHref(ticket?.title ?? "this DEMO order")}
          className="text-center text-sm font-medium text-cyan underline-offset-4 hover:underline"
        >
          Confirm on WhatsApp
        </a>
      </div>
    </div>
  );
}
