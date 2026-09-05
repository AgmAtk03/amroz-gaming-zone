import { trustSteps } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="Why buy here" className="border-b border-line bg-paper-2">
      <ol className="mx-auto grid max-w-5xl grid-cols-3 gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        {trustSteps.map((step) => (
          <li key={step.n} className="rounded-xl border border-line bg-panel px-2.5 py-2.5 sm:px-3 sm:py-3">
            <p className="text-[11px] font-semibold text-instant">{step.title}</p>
            <p className="mt-1 hidden text-[11px] text-muted sm:block">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
