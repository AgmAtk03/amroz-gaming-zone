import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { PaySuccess } from "@/components/pay-success";

export const metadata: Metadata = {
  title: "Receipt | Amroz Gaming Zone",
  description: "Order confirmed. Transaction and order IDs for your Amroz top-up.",
};

export default function PaySuccessPage() {
  return (
    <AppShell page="success">
      <PaySuccess />
    </AppShell>
  );
}
