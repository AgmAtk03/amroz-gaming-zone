import { DemoBadge } from "@/components/brand";
import { Photo } from "@/components/photo";
import { payHref, shopPageHref } from "@/lib/routes";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[26rem]">
        <Photo
          src="/images/hero.jpg"
          alt="Amroz counter — pads, mouse, and a phone mid-match"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/75 to-paper/25" />
        <div className="relative mx-auto flex min-h-[22rem] max-w-5xl flex-col justify-end px-4 py-8 sm:min-h-[26rem] sm:px-6 sm:py-12">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line bg-paper/80 px-3 py-1 text-xs text-ink-soft">
              Pepsicola · Ward 32
            </span>
            <DemoBadge>DEMO shop</DemoBadge>
          </div>
          <h1 className="font-serif max-w-xl text-[2rem] leading-[1.12] font-semibold tracking-tight sm:text-5xl">
            Instant digital. Same-day physical.
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Top-ups land on the ID. Gear leaves the Pepsicola counter within two
            hours. A Kathmandu marketplace — not a booth desk.
          </p>
          <div className="mt-5 grid max-w-md grid-cols-2 gap-2 text-xs sm:text-sm">
            <p className="rounded-xl border border-line bg-panel/90 px-3 py-2.5">
              <span className="block font-medium text-gold">Digital</span>
              Instant on the ID
            </p>
            <p className="rounded-xl border border-line bg-panel/90 px-3 py-2.5">
              <span className="block font-medium text-gold">Physical</span>
              Same-day · ≤ 2 hours
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={payHref("home")}
              className="thumb-btn inline-flex items-center justify-center rounded-full bg-gold px-5 text-sm font-semibold text-paper"
            >
              Top up now
            </a>
            <a
              href={shopPageHref("home")}
              className="thumb-btn inline-flex items-center justify-center rounded-full border border-line bg-panel/90 px-5 text-sm font-semibold"
            >
              Shop gear
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
