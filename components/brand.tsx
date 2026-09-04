export function Wordmark({
  compact = false,
  href = "/",
}: {
  compact?: boolean;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      aria-label="Amroz Gaming Zone home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel text-sm font-semibold">
        A
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold">Amroz</span>
        {!compact && (
          <span className="block text-xs text-muted">Gaming Zone</span>
        )}
      </span>
    </a>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-panel px-1.5 py-0.5 text-[10px] text-muted ${className}`}
    >
      Demo
    </span>
  );
}
