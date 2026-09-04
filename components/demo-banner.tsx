import { demoPayBanner } from "@/lib/demo-pay";

export function DemoPayBanner() {
  return (
    <div
      className="border-b border-magenta/40 bg-magenta/15 px-4 py-2 text-center"
      role="status"
    >
      <p className="font-display text-[11px] leading-snug tracking-[0.12em] text-magenta uppercase sm:text-xs">
        {demoPayBanner}
      </p>
    </div>
  );
}
