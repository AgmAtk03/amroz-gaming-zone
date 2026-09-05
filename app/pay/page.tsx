import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { PayFlow } from "@/components/pay-flow";

export const metadata: Metadata = {
  title: "Pay | Amroz Gaming Zone",
  description: "Pay with Khalti or eSewa. Instant Delivery on your game ID.",
};

export default function PayPage() {
  return (
    <AppShell page="pay">
      <PayFlow />
    </AppShell>
  );
}
