"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoBadge } from "@/components/brand";
import { HubArt, hubTile } from "@/components/hub-art";
import { ProductArt } from "@/components/product-art";
import { getHub, getPack, getPhysical, hubs, type Hub, type Pack, type PhysicalItem } from "@/lib/catalog";
import { demoPayNotice } from "@/lib/content";
import {
  demoWhatsAppHref,
  makeTxnId,
  mockWallets,
  physicalWhatsAppHref,
  type MockWalletId,
} from "@/lib/demo-pay";
import { useMember } from "@/lib/member";
import { payHref, shopPageHref, successHref } from "@/lib/routes";

export function PayFlow() {
  const search = useSearchParams();
  const hub = getHub(search.get("hub"));
  const item = getPhysical(search.get("sku"));
  const presetPack = search.get("pack");

  if (item) return <PhysicalPay item={item} />;
  if (hub) return <DigitalPay hub={hub} presetPackId={presetPack} />;
  return <HubPicker />;
}

function HubPicker() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">Demo checkout</p>
      <h1 className="font-serif mt-2 max-w-lg text-3xl font-semibold tracking-tight">
        Pick a hub. Nothing here charges a wallet.
      </h1>
      <p className="mt-2 max-w-lg text-sm text-muted">{demoPayNotice}</p>
      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {hubs.map((hub) => (
          <li key={hub.id}>
            <a
              href={payHref("pay", { hub: hub.id })}
              className={`flex min-h-[140px] flex-col rounded-2xl border border-line p-3 ${hubTile[hub.tone]}`}
            >
              <div className="h-12 w-12 overflow-hidden rounded-xl">
                <HubArt id={hub.id} />
              </div>
              <p className="mt-2 font-semibold">{hub.name}</p>
              <p className="text-xs text-muted">{hub.kind}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <a href={shopPageHref("pay")} className="text-teal underline-offset-4 hover:underline">
          Back to shop
        </a>
      </p>
    </div>
  );
}

function DigitalPay({ hub, presetPackId }: { hub: Hub; presetPackId: string | null }) {
  const preset = getPack(hub, presetPackId);
  const [pack, setPack] = useState<Pack | undefined>(preset);
  const [playerId, setPlayerId] = useState("");
  const [wallet, setWallet] = useState<MockWalletId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const member = useMember();
  const memberOn = Boolean(member);

  const step = !pack ? 1 : playerId.trim() ? 3 : 2;
  const wa = useMemo(() => demoWhatsAppHref(hub, pack, playerId), [hub, pack, playerId]);

  function onIdSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = playerId.trim();
    if (value.length < 3) {
      setError(`Enter a sample ${hub.idLabel.toLowerCase()} (3+ characters).`);
      return;
    }
    setError("");
    setPlayerId(value);
  }

  function startMockPay(id: MockWalletId) {
    if (!pack || playerId.trim().length < 3 || busy) return;
    setWallet(id);
    setBusy(true);
    const txn = makeTxnId();
    const query = new URLSearchParams({
      hub: hub.id,
      pack: pack.id,
      pay: id,
      pid: playerId.trim(),
      txn,
    }).toString();
    window.setTimeout(() => {
      window.location.href = successHref("pay", query);
    }, 650);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-xl">
          <HubArt id={hub.id} />
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">{hub.kind}</p>
          <h1 className="font-serif text-2xl font-semibold">{hub.name}</h1>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">{hub.blurb}</p>
      <p className="mt-1 text-xs text-muted">
        {demoPayNotice} <DemoBadge className="ml-1" />
      </p>
      {memberOn ? (
        <p className="mt-2 text-xs text-pine">Member rate on for this DEMO account.</p>
      ) : null}

      <ol className="mt-5 flex gap-2 text-[11px] font-medium tracking-wide uppercase">
        {["Pack", "ID", "Mock pay"].map((label, i) => {
          const n = i + 1;
          return (
            <li
              key={label}
              className={`flex-1 rounded-full px-2 py-1.5 text-center ${
                step === n
                  ? "bg-ink text-paper"
                  : step > n
                    ? "bg-paper-2 text-muted"
                    : "border border-line text-muted"
              }`}
            >
              {n}. {label}
            </li>
          );
        })}
      </ol>

      <section className="mt-6">
        <h2 className="text-sm font-semibold">1. Pack</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {hub.packs.map((item) => {
            const selected = pack?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPack(item);
                  setWallet(null);
                }}
                className={`rounded-2xl border px-3 py-3 text-left ${
                  selected ? "border-ink bg-ink text-paper" : `border-line ${hubTile[hub.tone]}`
                }`}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-sm">
                  NPR {memberOn ? item.memberPrice : item.price}
                </p>
                <p className={`mt-0.5 text-[11px] ${selected ? "text-paper/70" : "text-muted"}`}>
                  sample
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {pack ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold">2. {hub.idLabel}</h2>
          <form className="mt-3" onSubmit={onIdSubmit}>
            <label htmlFor="demo-player-id" className="text-xs text-muted">
              {hub.idHint}
            </label>
            <input
              id="demo-player-id"
              value={playerId}
              onChange={(e) => {
                setPlayerId(e.target.value);
                setError("");
              }}
              placeholder={hub.idPlaceholder}
              autoComplete="off"
              inputMode={hub.id === "valorant" || hub.id === "roblox" || hub.id === "psn" || hub.id === "steam" ? "text" : "numeric"}
              className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink"
            />
            {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
            <button
              type="submit"
              className="thumb-btn mt-3 w-full rounded-full bg-ink px-4 text-sm font-semibold text-paper"
            >
              Continue
            </button>
          </form>
        </section>
      ) : null}

      {pack && playerId.trim().length >= 3 ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold">3. Mock wallet</h2>
          <p className="mt-1 text-xs text-muted">Pure UI. No API keys.</p>
          <div className="mt-3 grid gap-2">
            {mockWallets.map((method) => (
              <button
                key={method.id}
                type="button"
                disabled={busy}
                onClick={() => startMockPay(method.id)}
                className="rounded-2xl border border-line bg-panel px-4 py-4 text-left"
              >
                <p className="font-semibold">{method.label}</p>
                <p className="mt-1 text-xs text-muted">{method.hint}</p>
                {wallet === method.id && busy ? (
                  <p className="mt-2 text-sm text-pine">Mock {method.name}… not contacting a bank.</p>
                ) : null}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <aside className="mt-6 rounded-2xl border border-line bg-paper-2 px-4 py-4 text-sm text-muted">
        <a
          href={wa}
          className="thumb-btn inline-flex w-full items-center justify-center rounded-full border border-line bg-panel px-4 font-semibold text-ink"
        >
          WhatsApp fallback
        </a>
        <p className="mt-3 text-xs">
          <a href={payHref("pay")} className="text-teal underline-offset-4 hover:underline">
            Other hubs
          </a>
          {" · "}
          <a href={shopPageHref("pay")} className="text-teal underline-offset-4 hover:underline">
            Shop
          </a>
        </p>
      </aside>
    </div>
  );
}

function PhysicalPay({ item }: { item: PhysicalItem }) {
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState<MockWalletId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const member = useMember();
  const memberOn = Boolean(member);
  const holdName = name || member?.name || "";

  function onHold(e: FormEvent) {
    e.preventDefault();
    if (holdName.trim().length < 2) {
      setError("Who should we hold this for?");
      return;
    }
    setError("");
  }

  function startMockPay(id: MockWalletId) {
    if (holdName.trim().length < 2 || busy) return;
    setWallet(id);
    setBusy(true);
    const txn = makeTxnId();
    const query = new URLSearchParams({
      sku: item.id,
      pay: id,
      pid: holdName.trim(),
      txn,
    }).toString();
    window.setTimeout(() => {
      window.location.href = successHref("pay", query);
    }, 650);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="h-28">
          <ProductArt group={item.group} />
        </div>
      </div>
      <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">{item.kind}</p>
      <h1 className="font-serif text-2xl font-semibold">{item.name}</h1>
      <p className="mt-2 text-sm text-muted">{item.blurb}</p>
      <p className="mt-2 text-sm">
        NPR {memberOn ? item.memberPrice : item.price}
        <span className="ml-2 text-xs text-muted">same-day · ≤ 2h · Pepsicola Ward 32</span>
      </p>
      <p className="mt-1 text-xs text-muted">
        {demoPayNotice} <DemoBadge className="ml-1" />
      </p>

      <form className="mt-6" onSubmit={onHold}>
        <label htmlFor="hold-name" className="text-sm font-semibold">
          Hold for
        </label>
        <input
          id="hold-name"
          value={holdName}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Name or WhatsApp"
          className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink"
        />
        {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
        <button
          type="submit"
          className="thumb-btn mt-3 w-full rounded-full bg-ink px-4 text-sm font-semibold text-paper"
        >
          Continue to mock pay
        </button>
      </form>

      {holdName.trim().length >= 2 ? (
        <div className="mt-6 grid gap-2">
          {mockWallets.map((method) => (
            <button
              key={method.id}
              type="button"
              disabled={busy}
              onClick={() => startMockPay(method.id)}
              className="rounded-2xl border border-line bg-panel px-4 py-4 text-left"
            >
              <p className="font-semibold">{method.label}</p>
              <p className="mt-1 text-xs text-muted">{method.hint}</p>
              {wallet === method.id && busy ? (
                <p className="mt-2 text-sm text-pine">Mock {method.name}…</p>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}

      <a
        href={physicalWhatsAppHref(item.name)}
        className="thumb-btn mt-6 inline-flex w-full items-center justify-center rounded-full border border-line px-4 text-sm font-semibold"
      >
        WhatsApp fallback
      </a>
    </div>
  );
}
