import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ShopSection } from "@/components/shop";
import { SiteFooter } from "@/components/site-footer";
import { shopPickup } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop | Amroz Gaming Zone",
  description:
    "Fantech gear and Free Fire top-up at Amroz. Confirm on WhatsApp and pick up at Pepsicola / football ground.",
};

export default function ShopPage() {
  return (
    <>
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to shop
      </a>
      <Header page="shop" />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="grid-overlay pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="font-display text-xs tracking-[0.28em] text-magenta uppercase">
              Shop · not the booth floor
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Confirm on WhatsApp. Pick up at {shopPickup.place}.
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Same counter list as the homepage strip. No online payment —
              we lock the SKU on chat, then you collect.
            </p>
          </div>
        </section>
        <ShopSection variant="page" />
      </main>
      <SiteFooter page="shop" />
    </>
  );
}
