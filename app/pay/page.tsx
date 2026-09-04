import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoPayBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { PayFlow } from "@/components/pay-flow";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Pay | Amroz Gaming Zone",
  description: "DEMO — sample prices · not live pay. Mock Khalti or eSewa only.",
};

function PayFallback() {
  return <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading checkout…</div>;
}

export default function PayPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header page="pay" sticky={false} />
      </div>
      <main className="flex-1">
        <Suspense fallback={<PayFallback />}>
          <PayFlow />
        </Suspense>
      </main>
      <SiteFooter page="pay" />
    </>
  );
}
