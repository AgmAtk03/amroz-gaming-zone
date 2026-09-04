export function Wordmark({
  compact = false,
  href = "/",
  inverse = false,
}: {
  compact?: boolean;
  href?: string;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
      aria-label="Amroz Gaming Zone home"
    >
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect
          x="1.5"
          y="1.5"
          width="33"
          height="33"
          rx="9"
          fill={inverse ? "#f3eee4" : "#1e1a16"}
        />
        <path
          d="M9 26 L18 9 L27 26"
          stroke={inverse ? "#1e1a16" : "#f3eee4"}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M13 18.5 H23" stroke="#b8893a" strokeWidth="2" />
      </svg>
      <span className="leading-tight">
        <span className={`font-serif block text-[15px] ${inverse ? "text-paper" : "text-ink"}`}>
          Amroz
        </span>
        {!compact && (
          <span
            className={`block text-[11px] tracking-[0.14em] uppercase ${inverse ? "text-paper/60" : "text-muted"}`}
          >
            Gaming Zone
          </span>
        )}
      </span>
    </a>
  );
}

export function DemoBadge({
  className = "",
  children = "DEMO",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-paper-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted ${className}`}
    >
      {children}
    </span>
  );
}
