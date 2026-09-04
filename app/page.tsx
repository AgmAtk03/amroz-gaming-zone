import { BookingForm } from "@/components/booking-form";
import { DemoBadge } from "@/components/brand";
import { Header } from "@/components/header";
import { MembersSection } from "@/components/members";
import { ShopPhoto } from "@/components/photo";
import { ShopSection } from "@/components/shop";
import { SiteFooter } from "@/components/site-footer";
import { SpeedHero } from "@/components/speed-promise";
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

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Games />
        <ShopSection />
        <MembersSection />
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
      <p className="text-sm text-muted">{kicker}</p>
      <h2 className="mt-1 text-3xl font-semibold tracking-tight">
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
    <section id="top">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span>{site.city} · {site.ward}</span>
            <DemoBadge />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            PlayStation club in Pepsicola.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            PS5 booths, a few PC seats, snacks. Book a slot, or buy top-ups and
            Fantech at the counter.
          </p>
          <SpeedHero />
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={wa}
              className="inline-flex items-center justify-center rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-white"
            >
              Book a booth
            </a>
            <a
              href="#shop"
              className="inline-flex items-center justify-center rounded-md bg-panel px-5 py-2.5 text-sm font-medium"
            >
              Shop
            </a>
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-line px-5 py-2.5 text-sm"
            >
              Directions
            </a>
          </div>
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-5 text-sm">
            <div>
              <dt className="text-muted">PS5 walk-in</dt>
              <dd className="mt-1">NPR 199/hr</dd>
            </div>
            <div>
              <dt className="text-muted">Open till</dt>
              <dd className="mt-1">12:30 AM Fri–Sat</dd>
            </div>
            <div>
              <dt className="text-muted">Floor</dt>
              <dd className="mt-1">PS5 + PC</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-lg border border-line bg-panel">
            <div className="h-44">
              <ShopPhoto
                src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1000&q=70"
                alt="PlayStation setup — placeholder until venue photos"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted">Booths right now</p>
              <p className="mt-1 text-lg font-semibold">Sample board</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["PS5-01 · FC 26", "Open"],
                  ["PS5-02 · GTA V", "In session"],
                  ["PS5-03 · Tekken 8", "Open"],
                  ["PC-A · Valorant", "Held 20:00"],
                ].map(([label, state]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between border-b border-line py-2 last:border-0"
                  >
                    <span>{label}</span>
                    <span className="text-muted">{state}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">
                Made up for the demo. <DemoBadge className="ml-1" />
              </p>
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
        title="What’s on the floor"
        lede="Sports, fighters, shooters, racing. Spare pads at the counter."
      />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((g) => (
          <article
            key={g.title}
            className="rounded-lg border border-line bg-panel p-4"
          >
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <p className="mt-2 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md border border-line px-2 py-0.5 text-xs text-muted"
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
          kicker="Booth passes"
          title="Weekly and monthly"
          lede="Cheaper than stacking hourly if you come more than twice a week. Hours reset."
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
                  ? "border-cyan bg-panel"
                  : "border-line bg-ink"
              }`}
            >
              {p.popular ? (
                <span className="absolute -top-3 left-6 rounded-md bg-cyan px-2.5 py-1 text-xs font-medium text-white">
                  Most used
                </span>
              ) : null}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-4 text-3xl font-semibold">
                NPR {p.price}
                <span className="text-base font-normal text-muted">/{p.cadence}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{p.save}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span aria-hidden="true">·</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-8 inline-flex justify-center rounded-full px-4 py-2.5 text-sm font-semibold ${
                  p.popular
                    ? "bg-cyan text-white"
                    : "border border-line"
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
        title="Upcoming nights"
        lede="Tekken Fridays, a football cup, and the odd LAN Sunday."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {events.map((e) => (
          <article
            key={e.title}
            className="rounded-lg border border-line bg-panel p-5"
          >
            <p className="text-xs text-muted">{e.status}</p>
            <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
            <p className="mt-2 text-sm">
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
          kicker="Photos"
          title="The room — placeholders"
          lede="Game and gear photos until we shoot the actual floor."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <figure
              key={g.title}
              className="overflow-hidden rounded-lg border border-line bg-panel"
            >
              <div className="h-48">
                <ShopPhoto src={g.photo} alt="" />
              </div>
              <figcaption className="p-4">
                <p className="font-medium">{g.title}</p>
                <p className="mt-1 text-sm text-muted">{g.caption}</p>
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
        title="Usual questions"
        lede="Hours, walk-ins, passes, food, ages, parking, shop speed."
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
        title="What people said"
        lede="Sample reviews. Not a live Google feed."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <blockquote
              key={r.name}
              className="rounded-lg border border-line bg-ink p-5"
            >
              <p className="text-amber" aria-label={`${r.stars} out of 5`}>
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
            kicker="Booking"
            title="Hold a booth"
            lede="Fridays fill up. WhatsApp or send the form. We hold 15 minutes."
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
          kicker="Visit"
          title="Pepsicola, Kathmandu"
          lede={`${site.areaHint}. Map pin is a stand-in until GPS is confirmed.`}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-lg font-semibold">{site.addressLine}</p>
            <p className="text-muted">
              By the football ground. Easy from Koteshwor, Jadibuti, Tinkune.
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
              className="mt-2 inline-flex rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-white"
            >
              Open directions
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line lg:col-span-3">
            <iframe
              title="Amroz Gaming Zone map — Pepsicola Kathmandu (demo pin)"
              src={site.mapsEmbed}
              className="h-80 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

