import { PayMarks } from "@/components/pay-marks";
import { Photo } from "@/components/photo";
import { payHref, shopPageHref } from "@/lib/routes";

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[16.5rem] overflow-hidden sm:min-h-[18rem]">
        <Photo
          src="/images/hero.jpg"
          alt="Amroz counter — pads, mouse, and a phone mid-match"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/75 to-paper/25" />
        <div className="relative mx-auto flex min-h-[16.5rem] max-w-5xl flex-col justify-end px-4 py-5 sm:min-h-[18rem] sm:px-6 sm:py-8">
          <h1 className="max-w-xl text-[1.65rem] leading-[1.15] font-semibold tracking-tight sm:text-4xl">
            Top-ups that land on your ID.
          </h1>
          <p className="mt-2 max-w-md text-[15px] text-ink-soft">
            Pick a game. Pay with eSewa or Khalti. Gear in 2 hours from Pepsicola.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <a
              href="#topups"
              className="thumb-btn inline-flex items-center justify-center rounded-xl bg-gold px-5 text-sm font-semibold text-paper"
            >
              Grab a top-up
            </a>
            <a
              href={payHref("home")}
              className="thumb-btn inline-flex items-center justify-center rounded-xl border border-line bg-panel/90 px-5 text-sm font-semibold"
            >
              Top up now
            </a>
            <a
              href={shopPageHref("home")}
              className="text-center text-sm font-medium text-ink-soft underline-offset-4 hover:underline sm:text-left"
            >
              Gaming gear
            </a>
          </div>
          <PayMarks className="mt-3" />
        </div>
      </div>
    </section>
  );
}
