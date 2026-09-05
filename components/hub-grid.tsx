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
    <section id="topups" className={compact ? "py-6" : "py-8 sm:py-10"}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Digital hubs</p>
        <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Tap a game. Buy a pack.
        </h2>
        <p className="mt-2 max-w-lg text-sm text-muted">
          Instant digital. Saved IDs live on this phone — last-used is the default.
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {hubs.map((hub) => (
            <li key={hub.id}>
              <a
                href={payHref(from, { hub: hub.id })}
                className="photo-card flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo src={hub.photo} alt={`${hub.name} top-up`} />
                  {hub.popular ? (
                    <span className="absolute top-2 left-2 rounded-full bg-paper/85 px-2 py-0.5 text-[10px] font-semibold text-gold">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight">{hub.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{hub.kind} · instant</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
