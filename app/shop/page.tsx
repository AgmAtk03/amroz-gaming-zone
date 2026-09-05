import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { BuyAgain } from "@/components/buy-again";
import { ChatWidget } from "@/components/chat-widget";
import { HubGrid } from "@/components/hub-grid";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop | Amroz Gaming Zone",
  description: site.tagline,
};

export default function ShopPage() {
  return (
    <AppShell page="shop">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Shop</p>
        <h1 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {site.tagline}
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Seven hubs and the full shelf. Pickup and drop-off from Pepsicola Ward
          32, usually within two hours.
        </p>
      </section>
      <BuyAgain from="shop" />
      <HubGrid from="shop" compact />
      <TrendingStrip from="shop" />
      <PhysicalShelf from="shop" variant="grid" />
      <ChatWidget from="shop" />
    </AppShell>
  );
}
