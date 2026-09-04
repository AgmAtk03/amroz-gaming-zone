import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoPayBanner } from "@/components/demo-banner";
import { DemoSuccess } from "@/components/demo-success";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Demo success | Amroz Gaming Zone",
  description:
    "DEMO — sample prices for owner review · not live pay. Top-up pending, no live charge.",
};

function SuccessFallback() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-muted">
      Loading demo receipt…
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header page="success" sticky={false} />
      </div>
      <main className="flex-1">
        <Suspense fallback={<SuccessFallback />}>
          <DemoSuccess />
        </Suspense>
      </main>
      <SiteFooter page="success" />
    </>
  );
}
