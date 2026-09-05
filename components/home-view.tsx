import { BundlesRow } from "@/components/bundles";
import { BuyAgain } from "@/components/buy-again";
import { CategoryBrowse } from "@/components/category-browse";
import { ChatWidget } from "@/components/chat-widget";
import { HeroCarousel } from "@/components/hero-carousel";
import { HubGrid } from "@/components/hub-grid";
import { MembersOffer } from "@/components/members-offer";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";
import { TrustBar } from "@/components/trust-bar";

export function HomeView() {
  return (
    <>
      <HeroCarousel />
      <TrendingStrip />
      <TrustBar />
      <CategoryBrowse />
      <BuyAgain />
      <HubGrid featured />
      <PhysicalShelf curated />
      <BundlesRow />
      <MembersOffer />
      <ChatWidget />
    </>
  );
}
