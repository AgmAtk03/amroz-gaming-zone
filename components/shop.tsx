import { DemoChip } from "@/components/demo-banner";
import { ShopPhoto } from "@/components/photo";
import { SpeedShop } from "@/components/speed-promise";
import {
  digitalHubs,
  memberSaveNote,
  shopConfirmHref,
  shopGear,
} from "@/lib/catalog";
import { shopPickup, speedCopy } from "@/lib/content";
import {
  homeHref,
  hubHref,
  navHref,
  payHref,
  shopPageHref,
  type SitePage,
} from "@/lib/routes";

export function ShopSection({
  variant = "strip",
}: {
  variant?: "strip" | "page";
}) {
  const from: SitePage = variant === "page" ? "shop" : "home";

  return (
    <section id="shop" className="club-band border-y border-line py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm text-muted">Shop</p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight">
            {variant === "page" ? "Fantech and digital top-ups" : "Gear and top-ups"}
          </h2>
          <p className="mt-2 text-muted">{shopPickup.line}</p>
          <SpeedShop />
        </div>

        <a
          href={navHref("members", from)}
          className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-md border border-line bg-panel px-3 py-1.5 text-sm"
        >
          {memberSaveNote}
          <DemoChip />
        </a>

        <h3 className="mt-10 text-sm font-medium text-muted">Fantech — 5 items</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shopGear.map((item) => (
            <article
              key={item.sku}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-panel"
            >
              <div className="h-40 bg-ink">
                <ShopPhoto src={item.photo} alt="" />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-muted">{item.kind}</p>
                <h3 className="mt-1 text-base font-semibold">{item.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{item.blurb}</p>
                <p className="mt-3 text-lg font-semibold">
                  NPR {item.nprLabel}
                  <span className="ml-2 text-xs font-normal text-muted">
                    DEMO · {item.band}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted">{speedCopy.gearFulfill}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={payHref(item.sku, from)}
                    className="inline-flex justify-center rounded-md bg-cyan px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Buy online (DEMO)
                  </a>
                  <a
                    href={shopConfirmHref(item.name)}
                    className="inline-flex justify-center rounded-md border border-line px-4 py-2 text-sm"
                  >
                    Confirm on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mt-12 text-sm font-medium text-muted">
          Digital top-ups — 7 hubs
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Free Fire, PUBG, MLBB, Valorant, Roblox, PS Store, Steam USD. Sample
          packs only — not a mall.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {digitalHubs.map((hub) => (
            <a
              key={hub.slug}
              href={hubHref(hub.slug, from)}
              className="flex flex-col rounded-lg border border-line bg-panel p-4"
            >
              <p className="text-xs text-muted">{hub.currency}</p>
              <h3 className="mt-1 text-base font-semibold">{hub.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{hub.blurb}</p>
              <p className="mt-2 text-xs font-medium">{speedCopy.digitalShort}</p>
              <p className="mt-3 text-sm font-medium text-cyan">Open packs</p>
            </a>
          ))}
          <a
            href={navHref("members", from)}
            className="flex flex-col rounded-lg border border-line bg-ink p-4"
          >
            <p className="text-xs text-muted">Amroz Members · DEMO</p>
            <h3 className="mt-1 text-base font-semibold">Join the list</h3>
            <p className="mt-2 flex-1 text-sm text-muted">
              Free signup. Sample perks on pickup, FF, a booth hour, and early
              brackets.
            </p>
            <p className="mt-3 text-sm font-medium">{memberSaveNote}</p>
          </a>
        </div>

        {variant === "strip" ? (
          <p className="mt-8 text-sm">
            <a href={shopPageHref(from)} className="text-cyan underline-offset-4 hover:underline">
              Full shop page
            </a>
          </p>
        ) : (
          <p className="mt-8 text-sm">
            <a href={homeHref("shop")} className="text-cyan underline-offset-4 hover:underline">
              Back to home
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
