import { Photo } from "@/components/photo";
import { hubs } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function HubGrid({
  from = "home",
  compact = false,
}: {
  from?: SitePage;
  compact?: boolean;
}) {
  return (
    <section id="topups" className={compact ? "py-4" : "py-6 sm:py-8"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Digital · 7 hubs</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Tap a game. Start with your UID.
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Instant on the ID. Last-used saved ID is the default.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {hubs.map((hub) => (
            <li key={hub.id}>
              <a
                href={payHref(from, { hub: hub.id })}
                className="photo-card flex flex-col overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Photo src={hub.photo} alt={`${hub.name} top-up`} />
                  <span className="absolute top-2 left-2 rounded-xl bg-paper/90 px-2 py-0.5 text-[10px] font-semibold">
                    Instant
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight">{hub.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{hub.kind}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
