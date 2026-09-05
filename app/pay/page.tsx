import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { PayFlow } from "@/components/pay-flow";

export const metadata: Metadata = {
  title: "Pay | Amroz Gaming Zone",
  description: "DEMO — sample prices · not live pay. Mock Khalti or eSewa only.",
};

export default function PayPage() {
  return (
    <AppShell page="pay">
      <PayFlow />
    </AppShell>
  );
}
