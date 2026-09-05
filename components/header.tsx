"use client";

import { useState } from "react";
import { Wordmark } from "@/components/brand";
import { nav } from "@/lib/content";
import { useMember } from "@/lib/member";
import {
  homeHref,
  navHref,
  payHref,
  reorderHref,
  shopPageHref,
  type SitePage,
} from "@/lib/routes";
import { maskGameId, useSavedStore } from "@/lib/saved-ids";
import { getHub, getPack } from "@/lib/catalog";

export function Header({
  page = "home",
  sticky = true,
}: {
  page?: SitePage;
  sticky?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState(false);
  const store = useSavedStore();
  const member = useMember();
  const badge = store.orders.length + store.ids.length;

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-line bg-paper/92 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-3 sm:h-16 sm:px-6">
        <Wordmark href={homeHref(page)} compact />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <a href={payHref(page)} className="rounded-md px-3 py-2 text-sm text-muted hover:text-ink">
            Top up
          </a>
          <a href={shopPageHref(page)} className="rounded-md px-3 py-2 text-sm text-muted hover:text-ink">
            Shop
          </a>
          {nav
            .filter((item) => item.label === "Contact")
            .map((item) => (
              <a
                key={item.href}
                href={navHref(item.href.slice(1), page)}
                className="rounded-md px-3 py-2 text-sm text-muted hover:text-ink"
              >
                {item.label}
              </a>
            ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAccount((v) => !v)}
            className="relative inline-flex h-10 items-center rounded-full border border-line px-3 text-xs font-medium text-ink-soft"
            aria-expanded={account}
            aria-controls="account-sheet"
          >
            Account
            {badge > 0 ? (
              <span className="ml-1.5 inline-flex min-w-5 justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-paper">
                {Math.min(badge, 9)}
              </span>
            ) : null}
          </button>
          <a
            href={payHref(page)}
            className="thumb-btn inline-flex items-center rounded-full bg-gold px-3 text-sm font-semibold text-paper sm:px-4"
          >
            Top up
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="border-t border-line bg-panel px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <a href={payHref(page)} className="thumb-btn flex items-center rounded-md px-3 text-base">
              Top up
            </a>
            <a href={shopPageHref(page)} className="thumb-btn flex items-center rounded-md px-3 text-base">
              Shop
            </a>
            <a
              href={navHref("contact", page)}
              className="thumb-btn flex items-center rounded-md px-3 text-base"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
      {account ? (
        <div
          id="account-sheet"
          className="border-t border-line bg-panel px-4 py-4 sm:px-6"
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                {member ? member.name : "This phone"} · DEMO
              </p>
              <button
                type="button"
                className="text-xs text-muted"
                onClick={() => setAccount(false)}
              >
                Close
              </button>
            </div>
            <p className="mt-1 text-xs text-muted">
              Saved IDs stay on this device. Later they sync to an account.
            </p>
            {store.orders.length ? (
              <ul className="mt-3 space-y-2">
                {store.orders.slice(0, 3).map((order) => {
                  const hub = getHub(order.hubId);
                  const pack = hub ? getPack(hub, order.packId) : undefined;
                  if (!hub || !pack) return null;
                  return (
                    <li key={order.id} className="flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="font-medium">
                          {hub.short} · {pack.label}
                        </p>
                        <p className="text-xs text-muted">
                          {maskGameId(order.playerId)} · {order.orderId}
                        </p>
                      </div>
                      <a
                        href={reorderHref(page, {
                          hub: order.hubId,
                          pack: order.packId,
                          sid: order.savedId,
                          oid: order.id,
                        })}
                        className="rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-paper"
                      >
                        Buy again
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">No orders yet. Top up once to save an ID.</p>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
