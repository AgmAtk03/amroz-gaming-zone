export function DemoPayBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="status"
      className={`demo-pay-banner ${compact ? "demo-pay-banner-compact" : ""}`}
    >
      <p className="text-[15px] leading-snug font-bold sm:text-lg">
        DEMO — sample prices for owner review · not live pay
      </p>
      <p className="mt-1 text-sm font-semibold sm:text-base">
        DEMO — no real money
      </p>
    </div>
  );
}

export function DemoChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-panel px-1.5 py-0.5 text-[10px] font-medium ${className}`}
    >
      DEMO
    </span>
  );
}
