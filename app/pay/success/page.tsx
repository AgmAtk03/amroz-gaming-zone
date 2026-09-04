import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoPayBanner } from "@/components/demo-banner";
import { Header } from "@/components/header";
import { PaySuccess } from "@/components/pay-success";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Receipt | Amroz Gaming Zone",
  description: "DEMO success — unique transaction ID, not a live charge.",
};

function SuccessFallback() {
  return <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading receipt…</div>;
}

export default function PaySuccessPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <DemoPayBanner />
        <Header page="success" sticky={false} />
      </div>
      <main className="flex-1">
        <Suspense fallback={<SuccessFallback />}>
          <PaySuccess />
        </Suspense>
      </main>
      <SiteFooter page="success" />
    </>
  );
}
