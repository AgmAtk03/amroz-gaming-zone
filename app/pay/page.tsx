import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "DEMO checkout | Amroz Gaming Zone",
  description:
    "Owner-pitch mock Khalti / eSewa. Sample prices. No live pay.",
};

export default function PayPage() {
  return (
    <>
      <Header page="pay" />
      <main className="flex-1">
        <CheckoutFlow />
      </main>
      <SiteFooter page="pay" />
    </>
  );
}
