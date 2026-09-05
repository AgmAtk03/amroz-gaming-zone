import { BuyAgain } from "@/components/buy-again";
import { ChatWidget } from "@/components/chat-widget";
import { HubGrid } from "@/components/hub-grid";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";

export function ShopView() {
  return (
    <>
      <TrendingStrip from="shop" />
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-gold uppercase">Shop</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Top-ups and gaming gear
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Credit lands on your ID. Gear from Pepsicola, Ward 32 — 2 hour delivery.
        </p>
      </section>
      <BuyAgain from="shop" />
      <HubGrid from="shop" compact />
      <PhysicalShelf from="shop" variant="grid" />
      <ChatWidget from="shop" />
    </>
  );
}
