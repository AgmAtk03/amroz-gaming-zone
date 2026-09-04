import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/checkout-success";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "DEMO success | Amroz Gaming Zone",
  description: "Mock pay complete. Code/top-up pending. No real money.",
};

export default function PayDonePage() {
  return (
    <>
      <Header page="done" />
      <main className="flex-1">
        <CheckoutSuccess />
      </main>
      <SiteFooter page="done" />
    </>
  );
}
