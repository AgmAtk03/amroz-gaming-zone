"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  demoHubs,
  demoPayNotice,
  demoWhatsAppHref,
  getDemoHub,
  getDemoPack,
  makeDemoRef,
  mockWallets,
  type DemoHub,
  type DemoPack,
  type MockWalletId,
} from "@/lib/demo-pay";
import { shopPickup } from "@/lib/content";
import { checkoutHref, shopPageHref, successHref } from "@/lib/routes";

const tileClass = {
  cyan: "tile-cyan",
  violet: "tile-violet",
  magenta: "tile-magenta",
} as const;

const walletClass = {
  violet:
    "border-violet/50 bg-violet/15 text-text hover:border-violet hover:bg-violet/25",
  cyan: "border-cyan/50 bg-cyan/15 text-text hover:border-cyan hover:bg-cyan/25",
} as const;

export function DemoCheckout() {
  const search = useSearchParams();
  const hubId = search.get("hub");
  const presetPack = search.get("pack");
  const hub = getDemoHub(hubId);

  if (!hub) {
    return <HubPicker />;
  }

  return <CheckoutWizard key={hub.id} hub={hub} presetPackId={presetPack} />;
}

function HubPicker() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-display text-xs tracking-[0.28em] text-magenta uppercase">
        Demo checkout
      </p>
      <h1 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Pick a sample path. Nothing here charges a wallet.
      </h1>
      <p className="mt-3 max-w-xl text-muted">{demoPayNotice}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {demoHubs.map((hub) => (
          <a
            key={hub.id}
            href={checkoutHref("checkout", hub.id)}
            className={`rounded-2xl border border-line p-5 ${tileClass[hub.accent]}`}
          >
            <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
              {hub.kind}
            </p>
            <h2 className="mt-2 text-xl font-semibold">{hub.name}</h2>
            <p className="mt-2 text-sm text-muted">{hub.blurb}</p>
            <p className="mt-4 text-sm font-medium text-cyan">Open sample packs →</p>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm">
        <a
          href={shopPageHref("checkout")}
          className="font-medium text-cyan underline-offset-4 hover:underline"
        >
          Back to shop
        </a>
      </p>
    </div>
  );
}

function CheckoutWizard({
  hub,
  presetPackId,
}: {
  hub: DemoHub;
  presetPackId: string | null;
}) {
  const preset = getDemoPack(hub, presetPackId);
  const [pack, setPack] = useState<DemoPack | undefined>(preset);
  const [playerId, setPlayerId] = useState("");
  const [readyForPay, setReadyForPay] = useState(false);
  const [wallet, setWallet] = useState<MockWalletId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const idSectionRef = useRef<HTMLElement>(null);
  const paySectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const step = !pack ? 1 : readyForPay ? 3 : 2;
  const canPay = Boolean(pack) && playerId.trim().length >= 3 && readyForPay;
  const wa = useMemo(
    () => demoWhatsAppHref(hub, pack, playerId),
    [hub, pack, playerId],
  );

  function persistPack(item: DemoPack) {
    setPack(item);
    setWallet(null);
    setReadyForPay(false);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("hub", hub.id);
    url.searchParams.set("pack", item.id);
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
    window.requestAnimationFrame(() => {
      idSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function onIdSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = playerId.trim();
    if (!pack) {
      setError("Pick a sample pack first.");
      return;
    }
    if (value.length < 3) {
      setError(`Enter a sample ${hub.idLabel.toLowerCase()} (3+ characters).`);
      return;
    }
    setError("");
    setPlayerId(value);
    setReadyForPay(true);
    window.requestAnimationFrame(() => {
      paySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function startMockPay(id: MockWalletId) {
    if (!pack || playerId.trim().length < 3 || busy) return;
    setWallet(id);
    setBusy(true);
    const ref = makeDemoRef();
    const query = new URLSearchParams({
      hub: hub.id,
      pack: pack.id,
      pay: id,
      pid: playerId.trim(),
      ref,
    }).toString();
    window.setTimeout(() => {
      window.location.href = successHref("checkout", query);
    }, 700);
  }

  return (
    <div
      data-checkout-ready={ready ? "1" : "0"}
      className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12"
    >
      <p className="font-display text-xs tracking-[0.28em] text-magenta uppercase">
        {hub.kind}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{hub.name}</h1>
      <p className="mt-2 text-sm text-muted">{hub.blurb}</p>
      <p className="mt-2 text-xs text-cyan">{demoPayNotice}</p>

      <ol className="mt-6 flex gap-2 text-[11px] font-medium tracking-wide uppercase">
        {["Pack", hub.id === "gear" ? "Hold for" : "Player ID", "Mock pay"].map(
          (label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <li
                key={label}
                className={`flex-1 rounded-full px-2 py-1.5 text-center ${
                  active
                    ? "bg-cyan/15 text-cyan"
                    : done
                      ? "bg-panel text-muted"
                      : "border border-line text-muted"
                }`}
              >
                {n}. {label}
              </li>
            );
          },
        )}
      </ol>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">1. Sample pack</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {hub.packs.map((item) => {
            const selected = pack?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                data-pack={item.id}
                onClick={() => persistPack(item)}
                className={`rounded-2xl border px-3 py-4 text-left ${
                  selected
                    ? "border-cyan bg-cyan/10 neon-border"
                    : `border-line ${tileClass[hub.accent]}`
                }`}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-2 font-display text-lg text-cyan">
                  NPR {item.price}
                </p>
                <p className="mt-1 text-[11px] text-muted">sample</p>
              </button>
            );
          })}
        </div>
      </section>

      <section ref={idSectionRef} className="mt-8 scroll-mt-28">
        <h2 className="text-sm font-semibold">2. {hub.idLabel}</h2>
        <form className="mt-3" onSubmit={onIdSubmit}>
          <label htmlFor="demo-player-id" className="text-xs text-muted">
            {hub.idHint}
          </label>
          <input
            id="demo-player-id"
            name="playerId"
            value={playerId}
            disabled={!pack}
            onChange={(e) => {
              setPlayerId(e.target.value);
              setReadyForPay(false);
              setError("");
            }}
            placeholder={pack ? hub.idPlaceholder : "Pick a pack first"}
            autoComplete="off"
            inputMode={hub.id === "psn" || hub.id === "gear" ? "text" : "numeric"}
            className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-base text-text outline-none focus:border-cyan disabled:opacity-50"
          />
          {error ? <p className="mt-2 text-sm text-magenta">{error}</p> : null}
          <button
            type="submit"
            disabled={!pack}
            className="mt-3 w-full rounded-full bg-cyan px-4 py-3 text-sm font-semibold text-ink glow-btn disabled:opacity-50"
          >
            Continue to mock pay
          </button>
        </form>
      </section>

      <section ref={paySectionRef} className="mt-8 scroll-mt-28">
        <h2 className="text-sm font-semibold">3. Mock wallet</h2>
        <p className="mt-1 text-xs text-muted">
          Pure UI. No API keys. No live Khalti or eSewa.
        </p>
        <div className="mt-3 grid gap-3">
          {mockWallets.map((method) => (
            <button
              key={method.id}
              type="button"
              disabled={!canPay || busy}
              onClick={() => startMockPay(method.id)}
              className={`rounded-2xl border px-4 py-4 text-left ${walletClass[method.tone]} ${
                !canPay ? "opacity-50" : ""
              } ${wallet === method.id && busy ? "opacity-80" : ""}`}
            >
              <p className="font-semibold">{method.label}</p>
              <p className="mt-1 text-xs text-muted">{method.hint}</p>
              {wallet === method.id && busy ? (
                <p className="mt-2 text-sm text-cyan">
                  Mock {method.name}… not contacting a bank.
                </p>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <aside className="mt-8 rounded-2xl border border-line bg-ink/60 px-4 py-4 text-sm text-muted">
        <p>
          Pickup · {shopPickup.place}
        </p>
        <a
          href={wa}
          className="mt-3 inline-flex w-full justify-center rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-text hover:border-cyan"
        >
          WhatsApp fallback
        </a>
        <p className="mt-3 text-xs">
          <a
            href={shopPageHref("checkout")}
            className="text-cyan underline-offset-4 hover:underline"
          >
            Back to shop
          </a>
          {hub.id === "gear" ? null : (
            <>
              {" · "}
              <a
                href={checkoutHref("checkout")}
                className="text-cyan underline-offset-4 hover:underline"
              >
                Other demo paths
              </a>
            </>
          )}
        </p>
      </aside>
    </div>
  );
}

