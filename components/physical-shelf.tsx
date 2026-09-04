"use client";

import { useState } from "react";
import { DemoBadge } from "@/components/brand";
import { ProductArt } from "@/components/product-art";
import { physical, physicalGroups, type PhysicalKind } from "@/lib/catalog";
import { physicalWhatsAppHref } from "@/lib/demo-pay";
import { payHref, type SitePage } from "@/lib/routes";

export function PhysicalShelf({
  from = "home",
  variant = "shelf",
}: {
  from?: SitePage;
  variant?: "shelf" | "grid";
}) {
  const [group, setGroup] = useState<PhysicalKind | "all">("all");
  const items = group === "all" ? physical : physical.filter((item) => item.group === group);

  return (
    <section id="shelf" className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Physical</p>
        <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Same-day from the Pepsicola shelf
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Delivery or pickup at Ward 32. We aim for two hours while the shutter
          is up. WhatsApp if you want a human to hold it.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {physicalGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGroup(g.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                group === g.id ? "bg-ink text-paper" : "border border-line bg-panel text-ink-soft"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <ul
          className={
            variant === "shelf"
              ? "shelf-scroll mt-5 flex snap-x gap-3 overflow-x-auto pb-2"
              : "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={
                variant === "shelf"
                  ? "w-[15.5rem] shrink-0 snap-start"
                  : ""
              }
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel">
                <div className="h-28">
                  <ProductArt group={item.group} />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] tracking-wide text-muted uppercase">
                    {item.kind} · {item.for}
                  </p>
                  <h3 className="mt-1 font-semibold leading-tight">{item.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{item.blurb}</p>
                  <p className="mt-3 text-sm">
                    NPR {item.price}
                    <span className="ml-2 text-xs text-muted">member {item.memberPrice}</span>
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href={payHref(from, { sku: item.id })}
                      className="thumb-btn inline-flex items-center justify-center rounded-full bg-ink px-3 text-sm font-semibold text-paper"
                    >
                      Hold / mock pay
                    </a>
                    <a
                      href={physicalWhatsAppHref(item.name)}
                      className="inline-flex items-center justify-center text-sm text-teal underline-offset-4 hover:underline"
                    >
                      WhatsApp fallback
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
