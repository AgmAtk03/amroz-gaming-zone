import { demoPayBanner } from "@/lib/content";

export function DemoPayBanner() {
  return (
    <div className="border-b border-gold/40 bg-gold/15 px-4 py-2 text-center" role="status">
      <p className="text-[11px] leading-snug font-medium tracking-[0.04em] text-ink-soft sm:text-xs">
        {demoPayBanner}
      </p>
    </div>
  );
}
