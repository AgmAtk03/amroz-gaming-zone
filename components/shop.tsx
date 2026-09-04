import {
  demoHubs,
  demoPayNotice,
  gearCheckoutHref,
} from "@/lib/demo-pay";
import {
  shopConfirmHref,
  shopGear,
  shopPickup,
  shopSteam,
} from "@/lib/content";
import { checkoutHref, homeHref, shopPageHref, type SitePage } from "@/lib/routes";

const tileClass = {
  cyan: "tile-cyan",
  violet: "tile-violet",
  magenta: "tile-magenta",
} as const;

export function ShopSection({
  variant = "strip",
}: {
  variant?: "strip" | "page";
}) {
  const from: SitePage = variant === "page" ? "shop" : "home";

  return (
    <section
      id="shop"
      className="border-y border-line bg-ink-2/80 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-display text-xs tracking-[0.28em] text-cyan uppercase">
            Shop
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {variant === "page"
              ? "Gear, top-ups, PlayStation Store credit"
              : "Buy path — gear, top-ups, PS Store"}
          </h2>
          <p className="mt-3 text-muted">{shopPickup.line}</p>
        </div>
        <p className="mt-4 text-sm text-cyan">{shopPickup.place}</p>
        <p className="mt-1 text-xs text-muted">{demoPayNotice}</p>

        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-text uppercase">
            Top-up hub
          </h3>
          <p className="mt-1 text-sm text-muted">
            Free Fire is the main path. PUBG and MLBB are thin samples. Same
            mock Khalti / eSewa — WhatsApp stays as fallback.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demoHubs
              .filter((hub) => hub.id !== "psn")
              .map((hub) => (
                <article
                  key={hub.id}
                  className={`flex flex-col rounded-2xl border p-5 ${
                    hub.id === "freefire"
                      ? "border-cyan/40 bg-panel neon-border"
                      : `border-line ${tileClass[hub.accent]}`
                  }`}
                >
                  <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
                    {hub.kind}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{hub.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{hub.blurb}</p>
                  <p className="mt-3 text-xs text-cyan">
                    Sample packs from NPR {hub.packs[0].price}
                  </p>
                  <a
                    href={checkoutHref(from, hub.id)}
                    className="mt-5 inline-flex justify-center rounded-full bg-cyan px-4 py-2.5 text-sm font-semibold text-ink glow-btn"
                  >
                    Demo top-up
                  </a>
                  <a
                    href={shopConfirmHref(hub.name)}
                    className="mt-2 inline-flex justify-center rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-text hover:border-cyan"
                  >
                    Confirm on WhatsApp
                  </a>
                </article>
              ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-text uppercase">
            PlayStation Store credit
          </h3>
          <p className="mt-1 text-sm text-muted">
            PS5 / GTA money = PlayStation Store wallet. Not Steam.
          </p>
          {demoHubs
            .filter((hub) => hub.id === "psn")
            .map((hub) => (
              <article
                key={hub.id}
                className="mt-4 flex flex-col rounded-2xl border border-cyan/40 bg-panel p-5 neon-border sm:flex-row sm:items-end sm:justify-between sm:gap-6"
              >
                <div className="max-w-xl">
                  <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
                    {hub.kind}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{hub.name}</h3>
                  <p className="mt-2 text-sm text-muted">{hub.blurb}</p>
                  <p className="mt-3 text-xs text-cyan">
                    Sample denoms NPR 500 · 1,000 · 2,000 · 5,000
                  </p>
                </div>
                <div className="mt-5 flex w-full flex-col gap-2 sm:mt-0 sm:w-auto sm:min-w-52">
                  <a
                    href={checkoutHref(from, hub.id)}
                    className="inline-flex justify-center rounded-full bg-cyan px-4 py-2.5 text-sm font-semibold text-ink glow-btn"
                  >
                    Demo PS credit
                  </a>
                  <a
                    href={shopConfirmHref(hub.name)}
                    className="inline-flex justify-center rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-text hover:border-cyan"
                  >
                    Confirm on WhatsApp
                  </a>
                </div>
              </article>
            ))}
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold tracking-wide text-text uppercase">
            Counter gear
          </h3>
          <p className="mt-1 text-sm text-muted">
            WhatsApp is the real hold. Demo buy is the same mock pay, pickup
            only.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopGear.map((item) => (
              <article
                key={item.sku}
                className={`flex flex-col rounded-2xl border border-line p-5 ${tileClass[item.accent]}`}
              >
                <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
                  {item.kind}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{item.blurb}</p>
                <p className="mt-4 font-display text-xl text-cyan">
                  NPR {item.price}
                  <span className="ml-2 font-sans text-xs font-normal text-muted">
                    guide
                  </span>
                </p>
                <a
                  href={shopConfirmHref(item.sku)}
                  className="mt-5 inline-flex justify-center rounded-full bg-cyan px-4 py-2.5 text-sm font-semibold text-ink glow-btn"
                >
                  Confirm on WhatsApp
                </a>
                <a
                  href={gearCheckoutHref(from, item.sku)}
                  className="mt-2 inline-flex justify-center rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-text hover:border-cyan"
                >
                  Demo buy
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-line/70 bg-ink/50 px-5 py-4 text-sm text-muted">
          <p className="font-medium text-text/80">{shopSteam.name}</p>
          <p className="mt-1">{shopSteam.note}</p>
        </div>

        {variant === "strip" ? (
          <p className="mt-6 text-sm">
            <a
              href={shopPageHref(from)}
              className="font-medium text-cyan underline-offset-4 hover:underline"
            >
              Open the shop page
            </a>
          </p>
        ) : (
          <p className="mt-6 text-sm">
            <a
              href={homeHref("shop")}
              className="font-medium text-cyan underline-offset-4 hover:underline"
            >
              Back to the venue homepage
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
