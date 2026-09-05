import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { PaySuccess } from "@/components/pay-success";

export const metadata: Metadata = {
  title: "Receipt | Amroz Gaming Zone",
  description: "DEMO success — unique transaction ID, not a live charge.",
};

export default function PaySuccessPage() {
  return (
    <AppShell page="success">
      <PaySuccess />
    </AppShell>
  );
}
