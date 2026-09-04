import { HubArt, hubTile } from "@/components/hub-art";
import { hubs } from "@/lib/catalog";
import { payHref, type SitePage } from "@/lib/routes";

export function TopupGrid({
  from = "home",
  compact = false,
}: {
  from?: SitePage;
  compact?: boolean;
}) {
  return (
    <section id="topups" className={compact ? "py-6" : "py-8 sm:py-12"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Quick top-ups</p>
            <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Tap a game. Buy a pack.
            </h2>
          </div>
        </div>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Instant digital. Pick the hub, choose a pack, drop the ID, mock-pay.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7 lg:gap-3">
          {hubs.map((hub) => (
            <li key={hub.id} className="lg:col-span-1">
              <a
                href={payHref(from, { hub: hub.id })}
                className={`flex min-h-[132px] flex-col rounded-2xl border border-line p-3 ${hubTile[hub.tone]}`}
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl">
                  <HubArt id={hub.id} />
                </div>
                <p className="mt-2 text-sm font-semibold leading-tight">{hub.name}</p>
                <p className="mt-0.5 text-[11px] text-muted">{hub.kind}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
