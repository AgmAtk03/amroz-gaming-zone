import { DemoBadge } from "@/components/brand";
import { PayMarks } from "@/components/pay-marks";
import { Photo } from "@/components/photo";
import { payHref, shopPageHref } from "@/lib/routes";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[24rem]">
        <Photo
          src="/images/hero.jpg"
          alt="Amroz counter — pads, mouse, and a phone mid-match"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/30" />
        <div className="relative mx-auto flex min-h-[22rem] max-w-5xl flex-col justify-end px-4 py-6 sm:min-h-[24rem] sm:px-6 sm:py-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-xl border border-line bg-paper/80 px-3 py-1 text-xs text-ink-soft">
              Pepsicola · Ward 32
            </span>
            <DemoBadge>DEMO shop</DemoBadge>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="#topups"
              className="rounded-xl bg-gold px-3 py-1.5 text-xs font-semibold text-paper"
            >
              Instant digital
            </a>
            <a
              href="#shelf"
              className="rounded-xl border border-line bg-panel/90 px-3 py-1.5 text-xs font-semibold"
            >
              Same-day physical
            </a>
          </div>
          <h1 className="mt-4 max-w-xl text-[1.75rem] leading-[1.15] font-semibold tracking-tight sm:text-4xl">
            Instant top-ups. Same-day gaming gear in Kathmandu.
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            UID-first digital credit. Gear from the Pepsicola counter within two
            hours. A marketplace — not a booth desk.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={payHref("home")}
              className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
            >
              Top up · NPR
            </a>
            <a
              href={shopPageHref("home")}
              className="thumb-btn inline-flex items-center justify-center rounded-xl border border-line bg-panel/90 px-5 text-sm font-semibold"
            >
              Shop gear
            </a>
          </div>
          <PayMarks className="mt-3" />
        </div>
      </div>
    </section>
  );
}
