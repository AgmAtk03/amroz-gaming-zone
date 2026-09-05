import { trustSteps } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="How it works" className="border-b border-line bg-paper-2">
      <ol className="mx-auto grid max-w-5xl grid-cols-3 gap-3 px-4 py-4 sm:gap-4 sm:px-6">
        {trustSteps.map((step) => (
          <li key={step.n} className="rounded-xl border border-line bg-panel px-3 py-3">
            <p className="text-[11px] font-semibold text-gold">{step.n}</p>
            <p className="mt-1 text-xs font-semibold sm:text-sm">{step.title}</p>
            <p className="mt-1 hidden text-[11px] text-muted sm:block">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
