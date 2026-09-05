import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ShopView } from "@/components/shop-view";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop | Amroz Gaming Zone",
  description: site.tagline,
};

export default function ShopPage() {
  return (
    <AppShell page="shop">
      <ShopView />
    </AppShell>
  );
}
