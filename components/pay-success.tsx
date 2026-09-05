"use client";

import { useEffect, useState } from "react";
import {
  demoWhatsAppHref,
  physicalWhatsAppHref,
  readDemoOrder,
  slaMissWhatsAppHref,
} from "@/lib/demo-pay";
import { usePageSearchParams } from "@/lib/page-search";
import { usePrefs } from "@/lib/prefs";
import { payHref, reorderHref, shopPageHref } from "@/lib/routes";
import { getDigitalOrderByTxn, getSavedId, maskGameId } from "@/lib/saved-ids";

function SlaClock({ dueAt, name, orderId }: { dueAt: number; name: string; orderId: string }) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  if (now === 0) {
    return <p className="mt-3 text-sm text-muted">SLA clock · 2 Hour Delivery</p>;
  }
  const left = dueAt - now;
  if (left <= 0) {
    return (
      <div className="mt-4 rounded-xl border border-rust/40 bg-rust/10 p-3 text-sm">
        <p className="font-medium text-rust">2 Hour Delivery missed</p>
        <p className="mt-1 text-xs text-muted">
          WhatsApp the shop. Credit applies on the next top-up.
        </p>
        <a
          href={slaMissWhatsAppHref(name, orderId)}
          className="mt-2 inline-flex text-sm text-teal underline-offset-4 hover:underline"
        >
          WhatsApp + credit
        </a>
      </div>
    );
  }
  const h = Math.floor(left / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  return (
    <p className="mt-3 text-sm text-pine">
      SLA clock · {h}h {m}m {s}s left for 2 Hour Delivery
    </p>
  );
}

export function PaySuccess() {
  const search = usePageSearchParams();
  const prefs = usePrefs();
  const [playerId, setPlayerId] = useState("");
  const [storedSid, setStoredSid] = useState<string | undefined>(undefined);
  const [storedOid, setStoredOid] = useState<string | undefined>(undefined);

  const parsed = search ? readDemoOrder(search) : null;

  useEffect(() => {
    if (!search) return;
    const next = readDemoOrder(search);
    const stored = getDigitalOrderByTxn(next.txn);
    const saved = getSavedId(next.sid);
    setPlayerId(stored?.playerId ?? saved?.value ?? "");
    setStoredSid(stored?.savedId);
    setStoredOid(stored?.id);
  }, [search]);

  if (!parsed) {
    return <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading receipt…</div>;
  }

  const sample = !parsed.pay || (!parsed.pack && !parsed.item) || !parsed.txn;
  const digital = parsed.hub && parsed.pack;
  const title = digital
    ? parsed.hub!.fulfillment
    : parsed.item
      ? "Held for 2 Hour Delivery · Pepsicola Ward 32"
      : "Receipt";

  const label = digital ? parsed.pack!.label : parsed.item?.name ?? "Order";
  const price = digital ? parsed.pack!.price : parsed.item?.price ?? "—";
  const idLabel = digital ? parsed.hub!.idLabel : "Hold for";
  const masked = digital
    ? playerId
      ? maskGameId(playerId)
      : "••••••"
    : parsed.hold || "Walk-in";
  const txn = parsed.txn || "—";
  const order = parsed.order || "—";
  const payName = parsed.pay?.name ?? "Khalti";

  const wa = digital && parsed.hub
    ? demoWhatsAppHref(parsed.hub, parsed.pack, playerId)
    : physicalWhatsAppHref(label);

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs font-semibold tracking-wide text-instant uppercase">Order confirmed</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        Keep the transaction and order IDs. WhatsApp the shop if anything looks off.
      </p>
      {sample ? (
        <p className="mt-2 text-xs text-muted">
          Open a pack from the shop to generate a fresh receipt.
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
            <dd className="font-mono font-medium">{masked}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Wallet</dt>
            <dd className="font-medium">{payName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Transaction ID</dt>
            <dd className="font-mono text-sm font-semibold tracking-wide">{txn}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Order ID</dt>
            <dd className="font-mono text-sm font-semibold tracking-wide">{order}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Collect</dt>
            <dd className="text-right">
              {digital ? "Instant Delivery · lands on your ID" : "2 Hour Delivery · Pepsicola Ward 32"}
            </dd>
          </div>
        </dl>
        {parsed.item && prefs.sla?.sku === parsed.item.id ? (
          <SlaClock dueAt={prefs.sla.dueAt} name={prefs.sla.name} orderId={prefs.sla.orderId} />
        ) : null}
        {prefs.referralCredit ? (
          <p className="mt-3 text-xs text-pine">
            Clan code {prefs.referral} · NPR {prefs.referralCredit} credit on next top-up.
          </p>
        ) : null}
        {prefs.restockNudge ? (
          <p className="mt-2 text-xs text-muted">Restock / low-balance WhatsApp nudge: on.</p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {digital && parsed.hub && parsed.pack && (storedSid || parsed.sid) ? (
          <a
            href={reorderHref("success", {
              hub: parsed.hub.id,
              pack: parsed.pack.id,
              sid: storedSid || parsed.sid,
              oid: storedOid,
            })}
            className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
          >
            Buy again · same ID
          </a>
        ) : null}
        <a
          href={wa}
          className="thumb-btn inline-flex items-center justify-center rounded-full border border-line px-5 text-sm font-semibold"
        >
          WhatsApp the shop
        </a>
        <a
          href={shopPageHref("success")}
          className="thumb-btn inline-flex items-center justify-center rounded-full border border-line px-5 text-sm font-semibold"
        >
          Back to shop
        </a>
        <a
          href={digital && parsed.hub ? payHref("success", { hub: parsed.hub.id }) : shopPageHref("success")}
          className="text-center text-sm text-teal underline-offset-4 hover:underline"
        >
          Other packs
        </a>
      </div>
    </div>
  );
}
