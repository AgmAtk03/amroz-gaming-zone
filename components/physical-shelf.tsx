"use client";

import { useMemo, useState } from "react";
import { Photo } from "@/components/photo";
import {
  getPhysical,
  homePhysicalIds,
  physical,
  physicalGroups,
  stockLabel,
  type PhysicalKind,
} from "@/lib/catalog";
import { physicalWhatsAppHref } from "@/lib/demo-pay";
import { payHref, shopPageHref, type SitePage } from "@/lib/routes";

type SortKey = "popular" | "price" | "margin";

export function PhysicalShelf({
  from = "home",
  variant = "grid",
  curated = false,
}: {
  from?: SitePage;
  variant?: "shelf" | "grid";
  curated?: boolean;
}) {
  const [group, setGroup] = useState<PhysicalKind | "all">("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const items = useMemo(() => {
    if (curated) {
      return homePhysicalIds.map((id) => getPhysical(id)).filter((item) => Boolean(item));
    }
    const list = group === "all" ? [...physical] : physical.filter((item) => item.group === group);
    list.sort((a, b) => {
      if (sort === "margin") return a.marginRank - b.marginRank;
      if (sort === "price") {
        const ap = Number(a.price.replace(/,/g, ""));
        const bp = Number(b.price.replace(/,/g, ""));
        return ap - bp;
      }
      return Number(Boolean(b.popular)) - Number(Boolean(a.popular));
    });
    return list;
  }, [curated, group, sort]);

  return (
    <section id="shelf" className="py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          Gaming gear
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Same-day from Pepsicola
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Pickup or drop-off, Ward 32. Usually within two hours.
        </p>
        {curated ? null : (
          <>
            <div className="mt-4 flex flex-wrap gap-3">
              {physicalGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGroup(g.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium ${
                    group === g.id ? "bg-gold text-paper" : "border border-line bg-panel text-ink-soft"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {(
                [
                  ["popular", "Popular"],
                  ["price", "Price"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSort(key)}
                  className={`rounded-xl px-3 py-1.5 text-[11px] ${
                    sort === key ? "border border-gold text-gold" : "border border-line text-muted"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        <ul
          className={
            variant === "shelf"
              ? "shelf-scroll mt-4 flex snap-x gap-3 overflow-x-auto pb-2"
              : "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"
          }
        >
          {items.map((item) => {
            if (!item) return null;
            return (
              <li
                key={item.id}
                className={variant === "shelf" ? "w-[15.5rem] shrink-0 snap-start" : ""}
              >
                <article className="photo-card flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/5]">
                    <Photo src={item.photo} alt={item.name} />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="rounded-xl bg-paper/90 px-2 py-0.5 text-[10px] font-semibold">
                        Same-day KTM
                      </span>
                      {item.stock === "in" ? (
                        <span className="rounded-xl bg-paper/90 px-2 py-0.5 text-[10px] font-semibold">
                          In stock
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className={`text-[11px] font-medium stock-${item.stock}`}>
                      {stockLabel(item.stock, item.qty)}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-tight">{item.name}</h3>
                    <p className="mt-2 text-sm font-medium">NPR {item.price}</p>
                    <a
                      href={payHref(from, { sku: item.id })}
                      className="thumb-btn mt-3 inline-flex items-center justify-center rounded-xl bg-gold px-3 text-xs font-semibold text-paper"
                    >
                      Hold · NPR
                    </a>
                    <a
                      href={physicalWhatsAppHref(item.name)}
                      className="mt-2 text-center text-[11px] text-muted underline-offset-4 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        {curated ? (
          <p className="mt-4 text-sm">
            <a href={shopPageHref(from)} className="font-medium text-gold underline-offset-4 hover:underline">
              Full shelf
            </a>
          </p>
        ) : (
          <p className="mt-3 text-xs text-muted">Stock updates from the Pepsicola counter.</p>
        )}
      </div>
    </section>
  );
}
