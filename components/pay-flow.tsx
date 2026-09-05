"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DemoBadge } from "@/components/brand";
import { PayMarks } from "@/components/pay-marks";
import { Photo } from "@/components/photo";
import { SavedIdPanel } from "@/components/saved-id-panel";
import {
  getBundle,
  getHub,
  getPack,
  getPhysical,
  hubs,
  type Bundle,
  type Hub,
  type Pack,
  type PhysicalItem,
} from "@/lib/catalog";
import { demoPayNotice, demoReferralCodes } from "@/lib/content";
import {
  comingWallet,
  demoWhatsAppHref,
  makeOrderId,
  makeTxnId,
  mockWallets,
  physicalWhatsAppHref,
  type MockWalletId,
} from "@/lib/demo-pay";
import { useMember } from "@/lib/member";
import { writePrefs } from "@/lib/prefs";
import { payHref, shopPageHref, successHref } from "@/lib/routes";
import {
  addSavedId,
  getDigitalOrder,
  getSavedId,
  lastUsedSavedId,
  maskGameId,
  recordDigitalOrder,
  useSavedStore,
  type SavedGameId,
} from "@/lib/saved-ids";

function slaDueFromNow() {
  return Date.now() + 2 * 60 * 60 * 1000;
}

export function PayFlow() {
  const search = useSearchParams();
  const hub = getHub(search.get("hub"));
  const item = getPhysical(search.get("sku"));
  const bundle = getBundle(search.get("bundle"));
  const presetPack = search.get("pack");
  const sid = search.get("sid");
  const reorder = search.get("reorder") === "1";
  const oid = search.get("oid");

  if (bundle) return <BundlePay bundle={bundle} />;
  if (item && !hub) return <PhysicalPay item={item} />;
  if (hub) {
    return (
      <DigitalPay
        hub={hub}
        presetPackId={presetPack}
        presetSid={sid}
        reorder={reorder}
        orderId={oid}
      />
    );
  }
  return <HubPicker />;
}

function HubPicker() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">Demo checkout</p>
      <h1 className="mt-2 max-w-lg text-3xl font-semibold tracking-tight">
        Pick a hub. Start with your UID.
      </h1>
      <p className="mt-2 max-w-lg text-sm text-muted">{demoPayNotice}</p>
      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {hubs.map((hub) => (
          <li key={hub.id}>
            <a
              href={payHref("pay", { hub: hub.id })}
              className="photo-card flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3]">
                <Photo src={hub.photo} alt="" />
              </div>
              <div className="p-3">
                <p className="font-semibold">{hub.name}</p>
                <p className="text-xs text-muted">Instant · {hub.kind}</p>
              </div>
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

function DigitalPay({
  hub,
  presetPackId,
  presetSid,
  reorder,
  orderId,
}: {
  hub: Hub;
  presetPackId: string | null;
  presetSid: string | null;
  reorder: boolean;
  orderId: string | null;
}) {
  const preset = getPack(hub, presetPackId);
  const prior = getDigitalOrder(orderId);
  const initialSaved =
    getSavedId(presetSid) ??
    (prior ? getSavedId(prior.savedId) : undefined) ??
    lastUsedSavedId(hub.id);

  const [pack, setPack] = useState<Pack | undefined>(preset);
  const [saved, setSaved] = useState<SavedGameId | undefined>(initialSaved);
  const [freshValue, setFreshValue] = useState("");
  const [freshLabel, setFreshLabel] = useState("main");
  const [saveNext, setSaveNext] = useState(true);
  const [wallet, setWallet] = useState<MockWalletId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [referral, setReferral] = useState("");
  const [nudge, setNudge] = useState(false);
  const [forcePick, setForcePick] = useState(false);
  const [idLocked, setIdLocked] = useState(Boolean(reorder && initialSaved));
  const member = useMember();
  const memberOn = Boolean(member);
  const savedStore = useSavedStore();
  const savedCount = savedStore.ids.filter((item) => item.hubId === hub.id).length;

  const activeId = saved?.value ?? "";
  const hasId = Boolean(saved && activeId.trim().length >= 3);
  const canConfirm = Boolean(pack && hasId);
  const startOnConfirm = Boolean(reorder && pack && hasId);
  const step: 1 | 2 | 3 =
    startOnConfirm && idLocked && !forcePick
      ? 3
      : !idLocked || forcePick || !hasId
        ? 1
        : !pack
          ? 2
          : 3;

  const wa = useMemo(
    () => demoWhatsAppHref(hub, pack, activeId),
    [hub, pack, activeId],
  );

  function onFreshSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = freshValue.trim();
    if (value.length < 3) {
      setError(`Enter a ${hub.idLabel.toLowerCase()} (3+ characters).`);
      return;
    }
    if (saveNext) {
      const result = addSavedId(hub.id, value, freshLabel);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSaved(result.saved);
    } else {
      setSaved({
        id: "ephemeral",
        hubId: hub.id,
        value,
        label: "once",
        lastUsedAt: null,
        createdAt: new Date().toISOString(),
      });
    }
    setError("");
    setForcePick(false);
    setIdLocked(true);
  }

  function startMockPay(id: MockWalletId) {
    if (!pack || activeId.trim().length < 3 || busy) return;
    let used = saved;
    if (!used || used.id === "ephemeral") {
      const result = addSavedId(hub.id, activeId, used?.label || "main");
      if (!result.ok) {
        setError(result.error);
        return;
      }
      used = result.saved;
      setSaved(used);
    }
    setWallet(id);
    setBusy(true);
    const txn = makeTxnId();
    const order = makeOrderId();
    if (demoReferralCodes.includes(referral.trim().toUpperCase() as (typeof demoReferralCodes)[number])) {
      writePrefs({ referral: referral.trim().toUpperCase(), referralCredit: 25 });
    }
    if (nudge) writePrefs({ restockNudge: true });
    recordDigitalOrder({
      hubId: hub.id,
      packId: pack.id,
      savedId: used.id,
      playerId: used.value,
      txn,
      orderId: order,
    });
    const query = new URLSearchParams({
      hub: hub.id,
      pack: pack.id,
      pay: id,
      sid: used.id,
      txn,
      order,
    }).toString();
    window.setTimeout(() => {
      window.location.href = successHref("pay", query);
    }, 500);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 overflow-hidden rounded-xl">
          <Photo src={hub.photo} alt="" />
        </div>
        <div>
          <p className="text-xs tracking-[0.16em] text-muted uppercase">{hub.kind}</p>
          <h1 className="text-2xl font-semibold">{hub.name}</h1>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">{hub.blurb}</p>
      <p className="mt-1 text-xs text-muted">
        {demoPayNotice} <DemoBadge className="ml-1" />
      </p>
      {memberOn ? (
        <p className="mt-2 text-xs text-pine">Member rate on — including reorder.</p>
      ) : null}
      {startOnConfirm ? (
        <p className="mt-2 text-xs text-gold">Reorder — confirm the same hub, pack, and ID.</p>
      ) : null}

      <ol className="mt-5 flex gap-2 text-[11px] font-medium tracking-wide uppercase">
        {["ID", "Pack", "Confirm"].map((label, i) => {
          const n = i + 1;
          return (
            <li
              key={label}
              className={`flex-1 rounded-xl px-2 py-1.5 text-center ${
                step === n
                  ? "bg-gold text-paper"
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

      {step === 1 ? (
        <section className="mt-6">
          <h2 className="text-sm font-semibold">1. {hub.idLabel}</h2>
          {savedCount > 0 ? (
            <div className="mt-3">
              <SavedIdPanel
                hub={hub}
                selectedId={saved?.id ?? null}
                onSelect={(next) => {
                  setSaved(next);
                }}
              />
              {saved ? (
                <button
                  type="button"
                  className="thumb-btn mt-3 w-full rounded-xl bg-gold text-sm font-semibold text-paper"
                  onClick={() => {
                    setForcePick(false);
                    setIdLocked(true);
                  }}
                >
                  Use {saved.label} · {maskGameId(saved.value)}
                </button>
              ) : null}
            </div>
          ) : (
            <form className="mt-3" onSubmit={onFreshSubmit}>
              <p className="text-xs text-muted">{hub.idHint} Save it once — next time is two taps.</p>
              <label className="mt-3 block text-xs text-muted">
                Short label
                <input
                  value={freshLabel}
                  onChange={(e) => setFreshLabel(e.target.value)}
                  placeholder="main"
                  maxLength={16}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </label>
              <input
                value={freshValue}
                onChange={(e) => {
                  setFreshValue(e.target.value);
                  setError("");
                }}
                placeholder={hub.idPlaceholder}
                autoComplete="off"
                inputMode={
                  hub.id === "valorant" || hub.id === "roblox" || hub.id === "psn" || hub.id === "steam"
                    ? "text"
                    : "numeric"
                }
                className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-gold"
              />
              <label className="mt-3 flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={saveNext}
                  onChange={(e) => setSaveNext(e.target.checked)}
                  className="mt-1"
                />
                <span>Save for next time? (default yes)</span>
              </label>
              {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
              <button
                type="submit"
                className="thumb-btn mt-3 w-full rounded-xl bg-gold px-4 text-sm font-semibold text-paper"
              >
                {pack ? "Continue to confirm" : "Continue to packs"}
              </button>
            </form>
          )}
        </section>
      ) : null}

      {step === 2 ? (
        <section className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-sm font-semibold">2. Pack</h2>
            {hasId ? (
              <button
                type="button"
                className="text-xs text-teal underline-offset-4 hover:underline"
                onClick={() => {
                  setForcePick(true);
                  setIdLocked(false);
                }}
              >
                Change ID · {maskGameId(activeId)}
              </button>
            ) : null}
          </div>
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
                    selected ? "border-gold bg-gold text-paper" : "border-line bg-panel"
                  }`}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-sm">NPR {memberOn ? item.memberPrice : item.price}</p>
                  <p className={`mt-0.5 text-[11px] ${selected ? "text-paper/70" : "text-muted"}`}>
                    Instant · sample
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {pack && canConfirm && step === 3 ? (
        <section className="mt-6 rounded-2xl border border-line bg-panel p-4">
          <h2 className="text-sm font-semibold">3. Confirm — then mock pay</h2>
          <p className="mt-1 text-xs text-muted">No silent ID swap. Check this before a wallet tap.</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Hub</dt>
              <dd className="font-medium">{hub.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">{hub.idLabel}</dt>
              <dd className="font-mono font-medium">
                {saved?.label ? `${saved.label} · ` : ""}
                {maskGameId(activeId)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Pack</dt>
              <dd className="font-medium">{pack.label}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Price</dt>
              <dd className="font-semibold text-gold">
                NPR {memberOn ? pack.memberPrice : pack.price}
                {memberOn ? <span className="ml-1 text-[11px] font-normal text-pine">member</span> : null}
              </dd>
            </div>
          </dl>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              className="text-xs text-teal underline-offset-4 hover:underline"
              onClick={() => {
                setForcePick(true);
                setIdLocked(false);
              }}
            >
              Change ID
            </button>
            <button
              type="button"
              className="text-xs text-teal underline-offset-4 hover:underline"
              onClick={() => setPack(undefined)}
            >
              Change pack
            </button>
          </div>

          <label className="mt-4 block text-xs text-muted">
            Clan / referral code (DEMO — credit on next digital)
            <input
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="AMROZ / WARD32 / SQUAD"
              className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-gold"
            />
          </label>
          <label className="mt-3 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={nudge}
              onChange={(e) => setNudge(e.target.checked)}
            />
            <span className="text-xs text-muted">
              WhatsApp me when this pack is low or restocked (DEMO opt-in)
            </span>
          </label>

          <PayMarks className="mt-4" />
          <div className="mt-3 grid gap-2">
            {mockWallets.map((method) => (
              <button
                key={method.id}
                type="button"
                disabled={busy}
                onClick={() => startMockPay(method.id)}
                className="rounded-2xl border border-line bg-paper px-4 py-4 text-left"
              >
                <p className="font-semibold">{method.label}</p>
                <p className="mt-1 text-xs text-muted">{method.hint}</p>
                {wallet === method.id && busy ? (
                  <p className="mt-2 text-sm text-pine">Mock {method.name}… minting txn + order ID.</p>
                ) : null}
              </button>
            ))}
            <div className="rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-muted">
              <p className="font-medium text-ink-soft">{comingWallet.label}</p>
              <p className="mt-1 text-xs">{comingWallet.hint}</p>
            </div>
          </div>
        </section>
      ) : null}

      <aside className="mt-6 rounded-2xl border border-line bg-paper-2 px-4 py-4 text-sm text-muted">
        <a
          href={wa}
          className="thumb-btn inline-flex w-full items-center justify-center rounded-xl border border-line bg-panel px-4 font-semibold text-ink"
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
    const order = makeOrderId();
    writePrefs({
      sla: {
        sku: item.id,
        name: item.name,
        orderId: order,
        dueAt: slaDueFromNow(),
      },
    });
    const query = new URLSearchParams({
      sku: item.id,
      pay: id,
      txn,
      order,
    }).toString();
    window.setTimeout(() => {
      window.location.href = successHref("pay", query);
    }, 500);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="aspect-[16/9]">
          <Photo src={item.photo} alt={item.name} />
        </div>
      </div>
      <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">{item.kind}</p>
      <h1 className="text-2xl font-semibold">{item.name}</h1>
      <p className="mt-2 text-sm text-muted">{item.blurb}</p>
      <p className="mt-2 text-sm">
        NPR {memberOn ? item.memberPrice : item.price}
        <span className="ml-2 text-xs text-muted">same-day · ≤ 2h · Pepsicola Ward 32</span>
      </p>
      <p className={`mt-1 text-xs stock-${item.stock}`}>
        Live shelf · {item.stock === "in" ? "on the counter" : item.stock === "low" ? "low" : "ask"}
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
          className="mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-gold"
        />
        {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
        <button
          type="submit"
          className="thumb-btn mt-3 w-full rounded-xl bg-gold px-4 text-sm font-semibold text-paper"
        >
          Continue to mock pay
        </button>
      </form>

      {holdName.trim().length >= 2 ? (
        <div className="mt-6 grid gap-2">
          <PayMarks />
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
          <div className="rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-muted">
            <p className="font-medium text-ink-soft">{comingWallet.label}</p>
            <p className="mt-1 text-xs">{comingWallet.hint}</p>
          </div>
        </div>
      ) : null}

      <a
        href={physicalWhatsAppHref(item.name)}
        className="thumb-btn mt-6 inline-flex w-full items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold"
      >
        WhatsApp fallback
      </a>
    </div>
  );
}

function BundlePay({ bundle }: { bundle: Bundle }) {
  const hub = getHub(bundle.hubId);
  const pack = hub ? getPack(hub, bundle.packId) : undefined;
  const item = getPhysical(bundle.sku);
  if (!hub || !pack || !item) return <HubPicker />;
  return (
    <DigitalPay
      hub={hub}
      presetPackId={pack.id}
      presetSid={null}
      reorder={false}
      orderId={null}
    />
  );
}
