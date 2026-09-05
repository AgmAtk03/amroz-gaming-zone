import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { PaySuccess } from "@/components/pay-success";

export const metadata: Metadata = {
  title: "Receipt | Amroz Gaming Zone",
  description: "DEMO success — unique transaction ID, not a live charge.",
};

function SuccessFallback() {
  return <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading receipt…</div>;
}

export default function PaySuccessPage() {
  return (
    <AppShell page="success">
      <Suspense fallback={<SuccessFallback />}>
        <PaySuccess />
      </Suspense>
    </AppShell>
  );
}
