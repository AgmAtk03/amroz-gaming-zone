"use client";

import { getHub, getPack } from "@/lib/catalog";
import { useMember } from "@/lib/member";
import { reorderHref, type SitePage } from "@/lib/routes";
import { maskGameId, useSavedStore } from "@/lib/saved-ids";

export function AccountDrawer({
  page,
  panel,
  onClose,
}: {
  page: SitePage;
  panel: "cart" | "account" | null;
  onClose: () => void;
}) {
  const store = useSavedStore();
  const member = useMember();
  if (!panel) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-[45] mx-auto max-w-lg px-3 md:bottom-4">
      <div className="rounded-2xl border border-line bg-panel p-4 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">
            {panel === "cart" ? "Cart · last orders" : member ? member.name : "This phone"}
            <span className="ml-2 text-[10px] font-medium tracking-wide text-muted uppercase">DEMO</span>
          </p>
          <button type="button" className="text-xs text-muted" onClick={onClose}>
            Close
          </button>
        </div>
        {panel === "account" ? (
          <p className="mt-1 text-xs text-muted">
            Saved IDs stay on this device. Later they sync to an account.
          </p>
        ) : (
          <p className="mt-1 text-xs text-muted">Buy again uses the same hub, pack, and masked ID.</p>
        )}
        {store.orders.length ? (
          <ul className="mt-3 space-y-3">
            {store.orders.slice(0, 3).map((order) => {
              const hub = getHub(order.hubId);
              const pack = hub ? getPack(hub, order.packId) : undefined;
              if (!hub || !pack) return null;
              return (
                <li key={order.id} className="flex items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium">
                      {hub.short} · {pack.label}
                    </p>
                    <p className="text-xs text-muted">
                      {maskGameId(order.playerId)} · NPR {pack.price}
                    </p>
                  </div>
                  <a
                    href={reorderHref(page, {
                      hub: order.hubId,
                      pack: order.packId,
                      sid: order.savedId,
                      oid: order.id,
                    })}
                    className="rounded-xl bg-gold px-3 py-1.5 text-xs font-semibold text-paper"
                  >
                    Buy again
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">No orders yet. Top up once to save an ID.</p>
        )}
      </div>
    </div>
  );
}
