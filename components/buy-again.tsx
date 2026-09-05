"use client";

import { getHub, getPack } from "@/lib/catalog";
import { Photo } from "@/components/photo";
import { useMember } from "@/lib/member";
import { reorderHref, type SitePage } from "@/lib/routes";
import { maskGameId, useSavedStore } from "@/lib/saved-ids";

export function BuyAgain({ from = "home" }: { from?: SitePage }) {
  const { orders } = useSavedStore();
  const member = useMember();
  const recent = orders.slice(0, 3);
  if (!recent.length) return null;

  return (
    <section id="buy-again" className="py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Buy again</p>
            <h2 className="font-serif mt-1 text-2xl font-semibold tracking-tight">
              Last {recent.length} digital {recent.length === 1 ? "order" : "orders"}
            </h2>
          </div>
          {member ? <p className="text-xs text-pine">Member price on</p> : null}
        </div>
        <ul className="shelf-scroll mt-4 flex snap-x gap-3 overflow-x-auto pb-1">
          {recent.map((order) => {
            const hub = getHub(order.hubId);
            const pack = hub ? getPack(hub, order.packId) : undefined;
            if (!hub || !pack) return null;
            const price = member ? pack.memberPrice : pack.price;
            return (
              <li key={order.id} className="w-[16.5rem] shrink-0 snap-start">
                <article className="photo-card overflow-hidden rounded-2xl">
                  <div className="h-28">
                    <Photo src={hub.photo} alt="" />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] tracking-wide text-muted uppercase">{hub.name}</p>
                    <p className="mt-0.5 font-semibold">{pack.label}</p>
                    <p className="mt-1 text-xs text-muted">
                      {maskGameId(order.playerId)} · NPR {price}
                    </p>
                    <a
                      href={reorderHref(from, {
                        hub: order.hubId,
                        pack: order.packId,
                        sid: order.savedId,
                        oid: order.id,
                      })}
                      className="thumb-btn mt-3 inline-flex w-full items-center justify-center rounded-full bg-gold text-sm font-semibold text-paper"
                    >
                      Buy again
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
