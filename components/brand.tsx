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
      <svg
        viewBox="0 0 36 36"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="1.5"
          width="33"
          height="33"
          rx="9"
          fill="#07060d"
          stroke="#22f0ff"
          strokeOpacity="0.75"
        />
        <path
          d="M9 27 L18 8 L27 27"
          stroke="#b56bff"
          strokeWidth="2.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M13 19 H23" stroke="#22f0ff" strokeWidth="2.2" />
      </svg>
      <span className="leading-tight">
        <span className="font-display block text-[13px] tracking-[0.22em] text-cyan uppercase">
          Amroz
        </span>
        {!compact && (
          <span className="block text-[11px] tracking-[0.18em] text-muted uppercase">
            Gaming Zone
          </span>
        )}
      </span>
    </a>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet ${className}`}
    >
      Demo placeholder
    </span>
  );
}
