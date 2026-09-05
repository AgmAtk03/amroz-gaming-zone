import type { Metadata } from "next";
import { BuyAgain } from "@/components/buy-again";
import { ChatWidget } from "@/components/chat-widget";
import { DemoPayBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { HubGrid } from "@/components/hub-grid";
import { PhysicalShelf } from "@/components/physical-shelf";
import { SiteFooter } from "@/components/site-footer";
import { TrendingStrip } from "@/components/trending";

export const metadata: Metadata = {
  title: "Shop | Amroz Gaming Zone",
  description:
    "Instant digital top-ups and same-day physical gear from Pepsicola Ward 32.",
};

export default function ShopPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header page="shop" sticky={false} />
      </div>
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">Shop</p>
          <h1 className="font-serif mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Instant digital. Same-day physical.
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Tap a hub for packs, or scroll the shelf. Pickup and drop-off from
            Pepsicola Ward 32, usually within two hours.
          </p>
        </section>
        <BuyAgain from="shop" />
        <HubGrid from="shop" compact />
        <TrendingStrip from="shop" />
        <PhysicalShelf from="shop" variant="grid" />
        <ChatWidget from="shop" />
      </main>
      <SiteFooter page="shop" />
    </>
  );
}
