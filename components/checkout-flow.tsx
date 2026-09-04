"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoPayBanner } from "@/components/demo-banner";
import {
  checkoutWhatsAppHref,
  getCheckoutItem,
  type CheckoutItem,
} from "@/lib/catalog";
import { payDoneHref, shopPageHref } from "@/lib/routes";

export const CHECKOUT_KEY = "amroz-demo-checkout";

export type PayMethod = "khalti" | "esewa";

export function CheckoutFlow() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <DemoPayBanner />
      <p className="mt-6 text-muted">Loading DEMO checkout…</p>
    </div>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const sku = params.get("sku") ?? "";
  const item = useMemo(() => (sku ? getCheckoutItem(sku) : undefined), [sku]);

  if (!item) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <DemoPayBanner />
        <h1 className="mt-6 text-2xl font-semibold">Pick a DEMO SKU first</h1>
        <p className="mt-2 text-muted">
          This mock pay screen needs a pack or Fantech item from the shop.
        </p>
        <a
          href={shopPageHref("pay")}
          className="mt-6 inline-flex rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-ink"
        >
          Back to shop
        </a>
      </div>
    );
  }

  return <CheckoutSteps item={item} />;
}

function CheckoutSteps({ item }: { item: CheckoutItem }) {
  const [step, setStep] = useState<"id" | "method" | "wallet">(
    item.needsId ? "id" : "method",
  );
  const [playerId, setPlayerId] = useState("");
  const [method, setMethod] = useState<PayMethod>("khalti");

  function goWallet(next: PayMethod) {
    setMethod(next);
    setStep("wallet");
  }

  function finish(e: FormEvent) {
    e.preventDefault();
    const payload = {
      sku: item.sku,
      title: item.title,
      nprLabel: item.nprLabel,
      method,
      playerId,
      successLine: item.successLine,
      kind: item.kind,
      at: new Date().toISOString(),
    };
    window.sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(payload));
    window.location.href = payDoneHref("pay");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:py-10">
      <DemoPayBanner />
      <p className="mt-6 text-sm text-muted">
        DEMO checkout · {item.kind === "gear" ? "Fantech" : "digital"}
      </p>
      <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{item.title}</h1>
      <p className="mt-1 text-muted">{item.subtitle}</p>
      <p className="mt-4 text-3xl font-semibold">
        NPR {item.nprLabel}
        <span className="ml-2 text-sm font-normal text-muted">sample</span>
      </p>
      <p className="mt-2 text-sm text-muted">
        {item.kind === "gear"
          ? "Same-day delivery or pickup at Pepsicola / football ground. Not a 2-hour window on gear."
          : "Same-day · within 2 hours for this digital code / top-up (Kathmandu)."}
      </p>

      {step === "id" ? (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setStep("method");
          }}
        >
          <label className="block text-sm">
            <span className="text-muted">{item.idLabel}</span>
            <input
              required
              name="playerId"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              placeholder={item.idHint}
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-3 text-lg text-text outline-none focus:border-cyan"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-cyan py-3 text-base font-medium text-white"
          >
            Continue to mock pay
          </button>
        </form>
      ) : null}

      {step === "method" ? (
        <div className="mt-8 space-y-3">
          {item.needsId && playerId ? (
            <p className="text-sm text-muted">
              ID: <span className="text-text">{playerId}</span>
            </p>
          ) : null}
          <p className="text-sm font-medium">Pay with (DEMO wallets)</p>
          <button
            type="button"
            onClick={() => goWallet("khalti")}
            className="flex w-full items-center justify-between rounded-md border border-line bg-panel px-4 py-4 text-left"
          >
            <span className="text-lg font-semibold">Khalti</span>
            <span className="text-sm text-muted">mock only</span>
          </button>
          <button
            type="button"
            onClick={() => goWallet("esewa")}
            className="flex w-full items-center justify-between rounded-md border border-line bg-panel px-4 py-4 text-left"
          >
            <span className="text-lg font-semibold">eSewa</span>
            <span className="text-sm text-muted">mock only</span>
          </button>
        </div>
      ) : null}

      {step === "wallet" ? (
        <form onSubmit={finish} className="mt-8">
          <MockWallet method={method} amount={item.nprLabel} />
          <label className="mt-4 block text-sm">
            <span className="text-muted">Mobile (sample)</span>
            <input
              required
              inputMode="numeric"
              name="mobile"
              placeholder="98XXXXXXXX"
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-3 text-text outline-none focus:border-cyan"
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-cyan py-3 text-base font-medium text-white"
          >
            Confirm DEMO pay · NPR {item.nprLabel}
          </button>
          <button
            type="button"
            className="mt-3 w-full text-sm text-cyan"
            onClick={() => setStep("method")}
          >
            Switch wallet
          </button>
        </form>
      ) : null}

      <a
        href={checkoutWhatsAppHref(item, playerId)}
        className="mt-8 block text-center text-sm font-medium text-cyan underline-offset-4 hover:underline"
      >
        Or Confirm on WhatsApp
      </a>
    </div>
  );
}

function MockWallet({ method, amount }: { method: PayMethod; amount: string }) {
  const khalti = method === "khalti";
  return (
    <div
      className="rounded-md border border-line bg-panel p-5"
    >
      <p className="text-xs tracking-widest uppercase opacity-80">
        {khalti ? "Khalti" : "eSewa"} · lookalike only
      </p>
      <p className="mt-2 text-xl font-semibold">
        Pay NPR {amount}
      </p>
      <p className="mt-2 text-sm text-muted">
        No API keys. No redirect to the real wallet. This button stays on Amroz.
      </p>
    </div>
  );
}
