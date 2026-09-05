export function PayMarks({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-2 text-[11px] text-muted ${className}`}>
      <span>Pay with</span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="inline-flex h-4 items-center rounded px-1.5 text-[10px] font-semibold tracking-wide text-ink"
          style={{ background: "#5D2E8C" }}
        >
          Khalti
        </span>
        <span
          className="inline-flex h-4 items-center rounded px-1.5 text-[10px] font-semibold tracking-wide text-ink"
          style={{ background: "#60BB46" }}
        >
          eSewa
        </span>
      </span>
    </p>
  );
}
