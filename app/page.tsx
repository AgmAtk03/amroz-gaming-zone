import { BookingForm } from "@/components/booking-form";
import { DemoBadge } from "@/components/brand";
import { Header } from "@/components/header";
import { ShopSection } from "@/components/shop";
import { SiteFooter } from "@/components/site-footer";
import {
  events,
  faqs,
  gallery,
  games,
  packages,
  reviews,
  site,
  whatsAppHref,
} from "@/lib/content";

const galleryClass = [
  "gallery-a",
  "gallery-b",
  "gallery-c",
  "gallery-d",
  "gallery-e",
  "gallery-f",
];

const gameClass = {
  cyan: "tile-cyan",
  violet: "tile-violet",
  magenta: "tile-magenta",
} as const;

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Games />
        <ShopSection />
        <Membership />
        <Events />
        <Gallery />
        <Faq />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <SiteFooter />
    </>
  );
}

function SectionHeading({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-xs tracking-[0.28em] text-cyan uppercase">
        {kicker}
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lede ? <p className="mt-3 text-muted">{lede}</p> : null}
    </div>
  );
}

function Hero() {
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;
  const wa = whatsAppHref("Hi Amroz — I want to book a booth.");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
              {site.city} · {site.ward}
            </span>
            <DemoBadge />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Duals, ranked nights, and neon that stays on past last bus.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Amroz Gaming Zone is a PlayStation club and electronics hangout in
            Ward 32 — PS5 booths, a tight PC arena, snack counter, and weekly
            brackets. Walk in, or lock a seat before Friday fills.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={wa}
              className="inline-flex items-center justify-center rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink glow-btn transition"
            >
              Book on WhatsApp
            </a>
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold text-text transition hover:border-magenta hover:text-magenta"
            >
              Visit · directions
            </a>
            <a
              href="#shop"
              className="inline-flex items-center justify-center px-2 py-3 text-sm font-medium text-cyan underline-offset-4 hover:underline"
            >
              Shop gear & Free Fire
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-muted">Walk-in PS5</dt>
              <dd className="mt-1 font-display text-lg text-cyan">NPR 199/hr</dd>
            </div>
            <div>
              <dt className="text-muted">Open till</dt>
              <dd className="mt-1 font-display text-lg">12:30 AM</dd>
            </div>
            <div>
              <dt className="text-muted">Booths</dt>
              <dd className="mt-1 font-display text-lg">PS5 + PC</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5">
          <div className="relative neon-border overflow-hidden rounded-3xl bg-panel p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden">
              <div className="scan h-10 bg-gradient-to-b from-cyan/0 via-cyan/20 to-cyan/0" />
            </div>
            <p className="font-display text-xs tracking-[0.28em] text-magenta uppercase">
              Live floor
            </p>
            <p className="mt-2 text-2xl font-semibold">Booth status</p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["PS5-01 · FC 26", "Open"],
                ["PS5-02 · GTA V", "In session"],
                ["PS5-03 · Tekken 8", "Open"],
                ["PC-A · Valorant", "Held 20:00"],
              ].map(([label, state]) => (
                <li
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-line bg-ink/60 px-4 py-3"
                >
                  <span>{label}</span>
                  <span
                    className={
                      state === "Open" ? "text-cyan" : "text-muted"
                    }
                  >
                    {state}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted">
              Invented for this demo — not a live feed.
              <DemoBadge />
            </p>
            <div className="relative mt-6 flex h-28 items-center justify-center">
              <div className="pulse-ring absolute h-24 w-24 rounded-full border border-cyan/40" />
              <div className="pulse-ring absolute h-24 w-24 rounded-full border border-magenta/40" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-ink font-display text-cyan">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Games() {
  return (
    <section id="play" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        kicker="Play"
        title="Games & entertainment"
        lede="A PS club with a PC side-hustle: sports, fighters, shooters, racing, and a gear counter so nobody sits out for a dead pad."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((g) => (
          <article
            key={g.title}
            className={`rounded-2xl border border-line p-5 ${gameClass[g.accent]}`}
          >
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <p className="mt-2 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-cyan"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section
      id="membership"
      className="border-y border-line bg-ink-2/80 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Membership"
          title="Weekly and monthly in NPR"
          lede="Priced like a Kathmandu PS club: cheaper than stacking hourly if you show up more than twice a week. Hours reset; they don’t roll."
        />
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          Walk-in: PS5 NPR 199/hr · PC NPR 179/hr · extra pad NPR 50/hr
          <DemoBadge />
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                p.popular
                  ? "border-cyan neon-border bg-panel"
                  : "border-line bg-ink"
              }`}
            >
              {p.popular ? (
                <span className="absolute -top-3 left-6 rounded-full bg-cyan px-3 py-1 text-[11px] font-semibold tracking-wide text-ink uppercase">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-4 font-display text-4xl text-cyan">
                NPR {p.price}
                <span className="text-base text-muted">/{p.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-magenta">{p.save}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-cyan" aria-hidden="true">
                      ▹
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-8 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-semibold ${
                  p.popular
                    ? "bg-cyan text-ink glow-btn"
                    : "border border-line text-text hover:border-cyan"
                }`}
              >
                Get this pass
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        kicker="Events"
        title="Tournaments & late brackets"
        lede="Weekly fighters, a seasonal football cup, and LAN Sundays when the PC row is worth reserving."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {events.map((e) => (
          <article
            key={e.title}
            className="rounded-2xl border border-line bg-panel p-6"
          >
            <p className="text-xs font-medium tracking-widest text-magenta uppercase">
              {e.status}
            </p>
            <h3 className="mt-2 text-xl font-semibold">{e.title}</h3>
            <p className="mt-3 text-sm text-cyan">
              {e.date} · {e.time}
            </p>
            <p className="mt-2 text-sm text-muted">{e.note}</p>
            <p className="mt-4 text-xs text-muted">
              {site.addressLine}
              <DemoBadge className="ml-2" />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section
      id="gallery"
      className="border-y border-line bg-ink-2/80 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Gallery"
          title="The floor, before we shoot it"
          lede="Styled venue tiles — not empty frames. Real photos replace these when the shutter’s documented."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g, i) => (
            <figure
              key={g.title}
              className={`relative min-h-56 overflow-hidden rounded-2xl border border-line ${galleryClass[i]}`}
            >
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4">
                <p className="font-semibold">{g.title}</p>
                <p className="text-sm text-muted">{g.caption}</p>
                <DemoBadge className="mt-2" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        kicker="FAQ"
        title="Before you take a booth"
        lede="Hours, walk-ins, memberships, food, ages, parking — the questions every Kathmandu PS club gets at the shutter."
      />
      <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-panel">
        {faqs.map((item) => (
          <details key={item.q} className="faq group px-5 py-1">
            <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium">
              {item.q}
              <span
                className="chev inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-cyan transition"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="border-y border-line bg-ink-2/80 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Social proof"
          title="What the last squad said"
          lede="Demo reviews in the voice of regulars — not imported widgets, not a live Google feed."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-2xl border border-line bg-ink p-6"
            >
              <p className="text-cyan" aria-label={`${r.stars} out of 5`}>
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
              </p>
              <p className="mt-3 text-text">&ldquo;{r.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-muted">
                <span className="font-medium text-text">{r.name}</span>
                <span> · {r.meta}</span>
                <DemoBadge className="ml-2" />
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker="Advance booking"
            title="Hold the booth. Then show up."
            lede="Friday duals and tournament windows go first. WhatsApp the desk or send a request — we’ll confirm a 15-minute hold."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>Groups of 6+ : book 48 hours ahead.</li>
            <li>Birthdays: two-booth block + playlist, extra NPR 500 setup.</li>
            <li>
              Phone{" "}
              <a href={`tel:${site.phoneTel}`} className="text-cyan">
                {site.phoneDisplay}
              </a>{" "}
              <DemoBadge className="ml-1" />
            </li>
          </ul>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

function Location() {
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;

  return (
    <section id="visit" className="border-t border-line bg-ink-2/80 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          kicker="Location"
          title="Ward 32, Kathmandu"
          lede={`${site.areaHint}. Pin is a demo stand-in until the exact shutter GPS is confirmed.`}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-lg font-semibold">{site.addressLine}</p>
            <p className="text-muted">
              Near the Naya Baneshwor / Minbhawan stretch — easy from Koteshwor,
              Tinkune, and New Baneshwor. Look for cyan light on the glass.
            </p>
            <dl className="space-y-2 text-sm">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-muted">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <DemoBadge />
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-ink glow-btn"
            >
              Open directions
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line lg:col-span-3">
            <iframe
              title="Amroz Gaming Zone map — Ward 32 Kathmandu (demo pin)"
              src={site.mapsEmbed}
              className="h-80 w-full grayscale contrast-125"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

