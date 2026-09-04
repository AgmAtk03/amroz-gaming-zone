"use client";

import { FormEvent, useState } from "react";
import { DemoBadge } from "@/components/brand";
import { site, whatsAppHref } from "@/lib/content";

export function BookingForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className="rounded-lg border border-line bg-panel p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm text-muted">Request saved</p>
        <h3 className="mt-2 text-2xl font-semibold">We’ll ping you on WhatsApp.</h3>
        <p className="mt-3 text-muted">
          This demo form does not send data anywhere. In production, the desk
          would confirm your booth hold.
        </p>
        <DemoBadge className="mt-4" />
        <button
          type="button"
          className="mt-6 text-sm text-cyan underline-offset-4 hover:underline"
          onClick={() => setSent(false)}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-line bg-panel p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-xl font-semibold">Hold a booth</h3>
        <DemoBadge />
      </div>
      <p className="mt-2 text-sm text-muted">
        No paid APIs — this stays on your device, then you can jump to WhatsApp.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-text outline-none focus:border-cyan"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Phone</span>
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="+977 …"
            autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-text outline-none focus:border-cyan"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Date</span>
          <input
            required
            name="date"
            type="date"
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-text outline-none focus:border-cyan"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Station</span>
          <select
            name="station"
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-text outline-none focus:border-cyan"
            defaultValue="ps5"
          >
            <option value="ps5">PS5 booth</option>
            <option value="pc">PC pod</option>
            <option value="party">Party / birthday block</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-muted">Hours & notes</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="e.g. Saturday 7–9 PM, two DualSense, FC 26"
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-text outline-none focus:border-cyan"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="rounded-md bg-cyan px-5 py-2.5 text-sm font-medium text-white"
        >
          Send booking request
        </button>
        <a
          href={whatsAppHref("Hi Amroz — I want to book a booth.")}
          className="text-center text-sm font-medium text-cyan underline-offset-4 hover:underline"
        >
          Or WhatsApp {site.phoneDisplay}
        </a>
      </div>
    </form>
  );
}
