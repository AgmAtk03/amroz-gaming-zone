import { DemoBadge } from "@/components/brand";
import { payHref, shopPageHref } from "@/lib/routes";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shop-grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-14">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-panel px-3 py-1 text-xs text-ink-soft">
            Pepsicola · Ward 32
          </span>
          <DemoBadge>DEMO shop</DemoBadge>
        </div>
        <h1 className="font-serif max-w-xl text-[2rem] leading-[1.15] font-semibold tracking-tight sm:text-5xl">
          Digital now. Physical today — within two hours.
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
          Top-ups land on the ID. Gear leaves the Pepsicola counter the same
          afternoon. Fast service, not a booth booking desk.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 text-xs sm:max-w-md sm:text-sm">
          <p className="rounded-xl border border-line bg-panel px-3 py-2.5">
            <span className="block font-medium text-ink">Digital</span>
            Instant delivery
          </p>
          <p className="rounded-xl border border-line bg-panel px-3 py-2.5">
            <span className="block font-medium text-ink">Physical</span>
            Same-day · ≤ 2 hours
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href={payHref("home")}
            className="thumb-btn inline-flex items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
          >
            Top up now
          </a>
          <a
            href={shopPageHref("home")}
            className="thumb-btn inline-flex items-center justify-center rounded-full border border-line bg-panel px-5 text-sm font-semibold text-ink"
          >
            Shop gear
          </a>
        </div>
      </div>
    </section>
  );
}
