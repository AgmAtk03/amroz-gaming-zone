"use client";

import { useMemo, useState } from "react";
import { categories, hubs, physical } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function CategoryRow({ from = "home" }: { from?: SitePage }) {
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
        meta: hub.kind,
        href: payHref(from, { hub: hub.id }),
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
        href: payHref(from, { sku: item.id }),
      }));
    return [...games, ...gear].slice(0, 6);
  }, [from, q]);

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={cat.href}
              className="rounded-xl border border-line bg-panel px-3 py-3 text-center text-sm font-semibold"
            >
              {cat.label}
            </a>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="sr-only">Search hubs or gear</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FF, PUBG, DualSense…"
            className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </label>
        {hits.length ? (
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-panel">
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
      </div>
    </section>
  );
}
