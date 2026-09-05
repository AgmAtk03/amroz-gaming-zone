import { AppShell } from "@/components/app-shell";
import { BundlesRow } from "@/components/bundles";
import { BuyAgain } from "@/components/buy-again";
import { CategoryRow } from "@/components/category-row";
import { ChatWidget } from "@/components/chat-widget";
import { Hero } from "@/components/hero";
import { HubGrid } from "@/components/hub-grid";
import { MembersOffer } from "@/components/members-offer";
import { PhysicalShelf } from "@/components/physical-shelf";
import { TrendingStrip } from "@/components/trending";
import { TrustBar } from "@/components/trust-bar";

export default function Home() {
  return (
    <AppShell page="home">
      <Hero />
      <TrustBar />
      <CategoryRow />
      <BuyAgain />
      <HubGrid />
      <TrendingStrip />
      <PhysicalShelf curated />
      <BundlesRow />
      <MembersOffer />
      <ChatWidget />
    </AppShell>
  );
}
