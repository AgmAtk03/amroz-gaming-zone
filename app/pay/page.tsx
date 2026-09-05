import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { PayFlow } from "@/components/pay-flow";

export const metadata: Metadata = {
  title: "Pay | Amroz Gaming Zone",
  description: "DEMO — sample prices · not live pay. Mock Khalti or eSewa only.",
};

function PayFallback() {
  return <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading checkout…</div>;
}

export default function PayPage() {
  return (
    <AppShell page="pay">
      <Suspense fallback={<PayFallback />}>
        <PayFlow />
      </Suspense>
    </AppShell>
  );
}
