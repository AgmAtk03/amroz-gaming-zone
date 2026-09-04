import { speedCopy } from "@/lib/content";

export function SpeedBadge() {
  return <p className="text-sm font-medium text-text">{speedCopy.digitalShort}</p>;
}

export function SpeedHero() {
  return (
    <p className="mt-4 max-w-xl text-sm text-muted">
      <span className="font-medium text-text">{speedCopy.digitalShort}</span>
      <span className="mt-1 block">Fantech: {speedCopy.gearFulfill}.</span>
    </p>
  );
}

export function SpeedShop() {
  return (
    <div className="mt-4 space-y-1 text-sm">
      <p className="font-medium text-text">{speedCopy.digitalShort}</p>
      <p className="text-muted">Fantech: {speedCopy.gearFulfill}.</p>
    </div>
  );
}

export function SpeedSuccess({ kind }: { kind: "gear" | "topup" | "wallet" }) {
  if (kind === "gear") {
    return (
      <p className="mt-4 rounded-md border border-line bg-panel px-4 py-3 text-sm">
        {speedCopy.gearFulfill}. Same-day for gear — not within 2 hours.
      </p>
    );
  }
  return (
    <p className="mt-4 rounded-md border border-line bg-panel px-4 py-3 text-sm font-medium">
      {speedCopy.digitalShort}
    </p>
  );
}
