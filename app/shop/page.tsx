import type { Metadata } from "next";
import { DemoPayBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { ShopSection } from "@/components/shop";
import { SiteFooter } from "@/components/site-footer";
import { SpeedShop } from "@/components/speed-promise";
import { shopPickup } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop | Amroz Gaming Zone",
  description:
    "Fantech gear: same-day delivery or pickup at Pepsicola. Digital codes same-day / within 2 hours in Kathmandu.",
};

export default function ShopPage() {
  return (
    <>
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan px-3 py-2 text-white"
      >
        Skip to shop
      </a>
      <Header page="shop" />
      <main className="flex-1">
        <DemoPayBanner />
        <section>
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <p className="text-sm text-muted">Shop</p>
            <h1 className="mt-1 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Five Fantech items. Seven top-up hubs.
            </h1>
            <p className="mt-3 max-w-xl text-muted">
              DEMO checkout for the owner pitch, or Confirm on WhatsApp.
              Counter: {shopPickup.place}.
            </p>
            <SpeedShop />
          </div>
        </section>
        <ShopSection variant="page" />
      </main>
      <SiteFooter page="shop" />
    </>
  );
}
