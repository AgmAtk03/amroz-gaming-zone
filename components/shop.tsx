import {
  shopConfirmHref,
  shopGear,
  shopPickup,
  shopSteam,
  shopTopup,
} from "@/lib/content";
import { homeHref, shopPageHref, type SitePage } from "@/lib/routes";

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
              ? "Gear and Free Fire at the counter"
              : "Buy path — gear & Free Fire"}
          </h2>
          <p className="mt-3 text-muted">{shopPickup.line}</p>
        </div>
        <p className="mt-4 text-sm text-cyan">{shopPickup.place}</p>
        <p className="mt-1 text-xs text-muted">
          Guide prices in NPR. Confirm stock and the final figure on WhatsApp.
          Pay when you pick up — no online checkout.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </article>
          ))}

          <article className="flex flex-col rounded-2xl border border-cyan/40 bg-panel p-5 neon-border">
            <p className="text-[11px] font-medium tracking-widest text-magenta uppercase">
              {shopTopup.kind}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{shopTopup.name}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">{shopTopup.blurb}</p>
            <p className="mt-4 text-sm text-cyan">Pickup · {shopPickup.place}</p>
            <a
              href={shopConfirmHref(shopTopup.sku)}
              className="mt-5 inline-flex justify-center rounded-full bg-cyan px-4 py-2.5 text-sm font-semibold text-ink glow-btn"
            >
              Confirm on WhatsApp
            </a>
          </article>
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
