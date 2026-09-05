"use client";

import { useSyncExternalStore } from "react";
import { Photo } from "@/components/photo";
import {
  getHub,
  getPhysical,
  shuffleTrending,
  trendingSeed,
  type TrendingItem,
} from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

let clientMix: TrendingItem[] | null = null;

function subscribe() {
  return () => {};
}

function getClientMix() {
  if (!clientMix) clientMix = shuffleTrending(trendingSeed);
  return clientMix;
}

function getServerMix() {
  return trendingSeed as TrendingItem[];
}

function trendingHref(from: SitePage, item: TrendingItem) {
  if (item.kind === "hub") return payHref(from, { hub: item.id });
  return payHref(from, { sku: item.id });
}

function trendingPhoto(item: TrendingItem) {
  if (item.kind === "hub") return getHub(item.id)?.photo ?? "/images/hero.jpg";
  return getPhysical(item.id)?.photo ?? "/images/hero.jpg";
}

function trendingMeta(item: TrendingItem) {
  if (item.kind === "hub") {
    const hub = getHub(item.id);
    return hub ? `from NPR ${hub.packs[0]?.price ?? "—"}` : "Top-up";
  }
  const gear = getPhysical(item.id);
  return gear ? `NPR ${gear.price}` : "Gear";
}

export function TrendingStrip({ from = "home" }: { from?: SitePage }) {
  const items = useSyncExternalStore(subscribe, getClientMix, getServerMix);

  return (
    <section id="trending" className="border-b border-line bg-paper-2 py-4 sm:py-5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gold uppercase">Trending</p>
            <h2 className="mt-0.5 text-xl font-semibold tracking-tight sm:text-2xl">
              Hot right now
            </h2>
          </div>
          <p className="hidden text-xs text-muted sm:block">Tap a square. Mix changes each visit.</p>
        </div>
        <ul className="shelf-scroll mt-3 flex snap-x gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-5">
          {items.map((item, i) => (
            <li
              key={`${item.kind}-${item.id}`}
              className="w-[42vw] max-w-[10.5rem] shrink-0 snap-start sm:w-auto sm:max-w-none"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <a
                href={trendingHref(from, item)}
                className="hub-card photo-card press-card flex flex-col overflow-hidden"
              >
                <div className="photo-shimmer relative aspect-square overflow-hidden">
                  <Photo src={trendingPhoto(item)} alt={item.title} />
                  <span className="absolute bottom-2 left-2 rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-semibold">
                    {item.kind === "hub" ? "Top-up" : "Gear"}
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-semibold leading-tight">{item.title}</p>
                  <p className="mt-0.5 text-[11px] text-gold">{trendingMeta(item)}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
