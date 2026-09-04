import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoPayBanner } from "@/components/demo-banner";
import { DemoCheckout } from "@/components/demo-checkout";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Demo checkout | Amroz Gaming Zone",
  description:
    "DEMO — sample prices for owner review · not live pay. Mock Khalti or eSewa only.",
};

function CheckoutFallback() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-muted">
      Loading demo checkout…
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header page="checkout" sticky={false} />
      </div>
      <main className="flex-1">
        <Suspense fallback={<CheckoutFallback />}>
          <DemoCheckout />
        </Suspense>
      </main>
      <SiteFooter page="checkout" />
    </>
  );
}
