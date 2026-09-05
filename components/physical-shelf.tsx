"use client";

import { useMemo, useState } from "react";
import { DemoBadge } from "@/components/brand";
import { Photo } from "@/components/photo";
import {
  physical,
  physicalGroups,
  stockLabel,
  type PhysicalKind,
} from "@/lib/catalog";
import { physicalWhatsAppHref } from "@/lib/demo-pay";
import { payHref, type SitePage } from "@/lib/routes";

type SortKey = "popular" | "price" | "margin";

export function PhysicalShelf({
  from = "home",
  variant = "grid",
}: {
  from?: SitePage;
  variant?: "shelf" | "grid";
}) {
  const [group, setGroup] = useState<PhysicalKind | "all">("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const items = useMemo(() => {
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
  }, [group, sort]);

  return (
    <section id="shelf" className="py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Physical marketplace</p>
        <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Same-day from the Pepsicola shelf
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Delivery or pickup at Ward 32. Two-hour SLA while the shutter is up.
          Miss the window — WhatsApp, small credit on the next digital.
        </p>
        <p className="mt-2 text-xs text-muted">
          Shelf checked 10:42 · DEMO truth
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {physicalGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                group === g.id ? "bg-gold text-paper" : "border border-line bg-panel text-ink-soft"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["popular", "Popular"],
              ["price", "Price"],
              ["margin", "Best margin"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={`rounded-full px-3 py-1.5 text-[11px] ${
                sort === key ? "border border-gold text-gold" : "border border-line text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul
          className={
            variant === "shelf"
              ? "shelf-scroll mt-5 flex snap-x gap-3 overflow-x-auto pb-2"
              : "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"
          }
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={variant === "shelf" ? "w-[15.5rem] shrink-0 snap-start" : ""}
            >
              <article className="photo-card flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3]">
                  <Photo src={item.photo} alt={item.name} />
                  {sort === "margin" && item.marginRank <= 2 ? (
                    <span className="absolute top-2 left-2 rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-semibold text-gold">
                      Best margin
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <p className={`text-[11px] font-medium stock-${item.stock}`}>
                    {stockLabel(item.stock, item.qty)}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-tight">{item.name}</h3>
                  <p className="mt-1 hidden text-xs text-muted sm:block">{item.blurb}</p>
                  <p className="mt-2 text-sm">
                    NPR {item.price}
                    <span className="ml-1 text-[11px] text-muted">≤2h</span>
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <a
                      href={payHref(from, { sku: item.id })}
                      className="thumb-btn inline-flex items-center justify-center rounded-full bg-gold px-3 text-xs font-semibold text-paper"
                    >
                      Hold / mock pay
                    </a>
                    <a
                      href={physicalWhatsAppHref(item.name)}
                      className="text-center text-[11px] text-teal underline-offset-4 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          Sample NPR. Stock is a DEMO guess. <DemoBadge className="ml-1" />
        </p>
      </div>
    </section>
  );
}
