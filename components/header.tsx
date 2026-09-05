"use client";

import { FormEvent, useMemo, useState } from "react";
import { InstantBadge, Wordmark } from "@/components/brand";
import { gameChips, hubs, physical } from "@/lib/catalog";
import { homeHref, payHref, shopPageHref, type SitePage } from "@/lib/routes";
import { useSavedStore } from "@/lib/saved-ids";

export function Header({
  page = "home",
  sticky = true,
  onOpenAccount,
  onOpenCart,
}: {
  page?: SitePage;
  sticky?: boolean;
  onOpenAccount?: () => void;
  onOpenCart?: () => void;
}) {
  const store = useSavedStore();
  const badge = Math.min(store.orders.length, 9);
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const games = hubs
      .filter(
        (hub) =>
          hub.name.toLowerCase().includes(needle) ||
          hub.short.toLowerCase().includes(needle) ||
          hub.kind.toLowerCase().includes(needle),
      )
      .map((hub) => ({
        key: hub.id,
        label: hub.name,
        meta: `Instant Delivery · ${hub.kind}`,
        href: payHref(page, { hub: hub.id }),
      }));
    const gear = physical
      .filter(
        (item) =>
          item.name.toLowerCase().includes(needle) ||
          item.sku.toLowerCase().includes(needle) ||
          item.kind.toLowerCase().includes(needle),
      )
      .slice(0, 4)
      .map((item) => ({
        key: item.id,
        label: item.name,
        meta: item.kind,
        href: payHref(page, { sku: item.id }),
      }));
    return [...games, ...gear].slice(0, 6);
  }, [page, q]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    if (hits[0]) window.location.href = hits[0].href;
  }

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-line bg-paper/95 backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-2.5 sm:px-6">
        <Wordmark href={homeHref(page)} compact />
        <form className="relative hidden min-w-0 flex-1 md:block" onSubmit={onSearch}>
          <label className="sr-only" htmlFor="shop-search">
            Search games
          </label>
          <input
            id="shop-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Free Fire, PUBG, MLBB…"
            className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
          {hits.length ? (
            <ul className="absolute inset-x-0 top-full z-20 mt-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel shadow-xl">
              {hits.map((hit) => (
                <li key={hit.key}>
                  <a href={hit.href} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span>{hit.label}</span>
                    <span className="text-xs text-muted">{hit.meta}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden items-center sm:inline-flex">
            <InstantBadge />
          </span>
          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex h-10 items-center rounded-xl border border-line px-3 text-xs font-semibold"
          >
            Cart
            {badge ? (
              <span className="ml-1.5 inline-flex min-w-5 justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-paper">
                {badge}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={onOpenAccount}
            className="hidden h-10 items-center rounded-xl border border-line px-3 text-xs font-semibold md:inline-flex"
          >
            Account
          </button>
        </div>
      </div>

      <form className="px-3 pb-2 md:hidden" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="shop-search-m">
          Search games
        </label>
        <input
          id="shop-search-m"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Free Fire, PUBG, MLBB…"
          className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        {hits.length ? (
          <ul className="mt-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel">
            {hits.map((hit) => (
              <li key={hit.key}>
                <a href={hit.href} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span>{hit.label}</span>
                  <span className="text-xs text-muted">{hit.meta}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </form>

      <nav aria-label="Shop games" className="border-t border-line">
        <ul className="chip-row mx-auto flex max-w-5xl gap-2 overflow-x-auto px-3 py-2 sm:px-6">
          {gameChips.map((chip) => (
            <li key={chip.id} className="shrink-0">
              <a
                href={payHref(page, { hub: chip.id })}
                className="inline-flex rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-semibold"
              >
                {chip.label}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href={page === "shop" ? "#shelf" : shopPageHref(page)}
              className="inline-flex rounded-full border border-line bg-panel px-3 py-1.5 text-xs font-semibold"
            >
              Gear
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
