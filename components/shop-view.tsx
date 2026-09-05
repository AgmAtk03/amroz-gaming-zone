import { BuyAgain } from "@/components/buy-again";
import { ChatWidget } from "@/components/chat-widget";
import { HubGrid } from "@/components/hub-grid";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";

export function ShopView() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-instant uppercase">Shop</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Top-ups and gaming gear
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Instant Delivery on the ID. Gear from Pepsicola, Ward 32 — usually within two hours.
        </p>
      </section>
      <BuyAgain from="shop" />
      <HubGrid from="shop" compact />
      <TrendingStrip from="shop" />
      <PhysicalShelf from="shop" variant="grid" />
      <ChatWidget from="shop" />
    </>
  );
}
