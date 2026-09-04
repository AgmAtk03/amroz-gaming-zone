import { DemoPayBanner } from "@/components/demo-banner";
import { SpeedBadge } from "@/components/speed-promise";
import { shopConfirmHref, type DigitalHub } from "@/lib/catalog";
import { payHref, shopPageHref } from "@/lib/routes";

export function HubPacks({ hub }: { hub: DigitalHub }) {
  return (
    <>
      <DemoPayBanner />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm text-muted">{hub.currency} · sample packs</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{hub.name}</h1>
        <p className="mt-2 max-w-xl text-muted">{hub.blurb}</p>
        <div className="mt-3">
          <SpeedBadge />
        </div>
        <p className="mt-2 text-sm text-muted">
          Pick a pack, enter an ID, then mock Khalti or eSewa.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {hub.packs.map((pack) => (
            <a
              key={pack.sku}
              href={payHref(pack.sku, "hub")}
              className="flex items-center justify-between rounded-lg border border-line bg-panel px-5 py-4"
            >
              <span>
                <span className="block font-medium">{pack.label}</span>
                <span className="text-sm text-muted">{pack.amount} · sample</span>
              </span>
              <span className="text-lg font-semibold">NPR {pack.nprLabel}</span>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={shopPageHref("hub")}
            className="text-sm text-cyan underline-offset-4 hover:underline"
          >
            All hubs
          </a>
          <a
            href={shopConfirmHref(hub.name, "digital")}
            className="text-sm text-muted underline-offset-4 hover:underline"
          >
            Confirm {hub.short} on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
