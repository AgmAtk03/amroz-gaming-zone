import { BundlesRow } from "@/components/bundles";
import { BuyAgain } from "@/components/buy-again";
import { CategoryRow } from "@/components/category-row";
import { ChatWidget } from "@/components/chat-widget";
import { DemoPayBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HubGrid } from "@/components/hub-grid";
import { MembersOffer } from "@/components/members-offer";
import { PhysicalShelf } from "@/components/physical-shelf";
import { SiteFooter } from "@/components/site-footer";
import { TrendingStrip } from "@/components/trending";
import { TrustBar } from "@/components/trust-bar";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header sticky={false} />
      </div>
      <main id="main" className="flex-1">
        <Hero />
        <TrustBar />
        <CategoryRow />
        <BuyAgain />
        <HubGrid />
        <TrendingStrip />
        <MembersOffer />
        <BundlesRow />
        <PhysicalShelf />
        <ChatWidget />
      </main>
      <SiteFooter />
    </>
  );
}
