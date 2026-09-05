"use client";

import { BuyAgain } from "@/components/buy-again";
import { CategoryBrowse } from "@/components/category-browse";
import { ChatWidget } from "@/components/chat-widget";
import { HubGrid } from "@/components/hub-grid";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";
import { catalogCategories } from "@/lib/catalog";
import { usePageSearchParams } from "@/lib/page-search";

export function ShopView() {
  const search = usePageSearchParams();
  const cat = search?.get("cat") ?? "";
  const active = catalogCategories.some((row) => row.id === cat) ? cat : "";
  const label = catalogCategories.find((row) => row.id === active)?.label;

  return (
    <>
      <TrendingStrip from="shop" />
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-gold uppercase">Shop</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {label ?? "Categories, then a game"}
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          One card per game. Packs show after you tap in. Gear is 2 hour delivery.
        </p>
      </section>
      {!active ? <CategoryBrowse from="shop" /> : null}
      <BuyAgain from="shop" />
      {active === "gear" ? (
        <PhysicalShelf from="shop" variant="grid" />
      ) : (
        <HubGrid from="shop" compact category={active || undefined} featured={!active} />
      )}
      {!active ? <PhysicalShelf from="shop" curated /> : null}
      <ChatWidget from="shop" />
    </>
  );
}
