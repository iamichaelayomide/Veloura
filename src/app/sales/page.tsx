import Link from "next/link";
import { ArrowRight, Clock3, PauseCircle, Sparkles } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";

const salesBoards = {
  live: [
    {
      title: "Velvet Week",
      note: "Active now",
      detail: "Shop selected wigs, closures, frontals, and styling extras while this edit is live. Best for shoppers who already know they want a polished finish without paying full price.",
      cta: "Shop live sale",
    },
  ],
  upcoming: [
    {
      title: "Bridal Weekend Drop",
      note: "Starts next Friday",
      detail: "Built for birthdays, bridal glam, and event prep. Expect ready-to-wear units, premium lengths, and finishing extras that make last-minute shopping easier.",
      cta: "Preview the collection",
    },
  ],
  paused: [
    {
      title: "Flash Dispatch Sale",
      note: "Paused",
      detail: "This event is temporarily held while stock and delivery capacity are being reset so shoppers do not buy into delays.",
      cta: "Browse full shop",
    },
  ],
  archive: [
    {
      title: "Melt15K",
      note: "Completed",
      detail: "Past discount event focused on install tools, finishing products, and shopper-ready extras.",
      cta: "See current offers",
    },
    {
      title: "ShipVel",
      note: "Completed",
      detail: "Past free-shipping event for selected order windows and higher-value carts.",
      cta: "See current offers",
    },
  ],
};

const statusMeta = {
  live: {
    icon: Sparkles,
    title: "Shop what is active now",
    description: "If you are ready to buy, start with the live sale rail first.",
  },
  upcoming: {
    icon: Clock3,
    title: "Plan what you want next",
    description: "Keep an eye on the next drop so you can move early when it opens.",
  },
  paused: {
    icon: PauseCircle,
    title: "Held back for quality control",
    description: "Paused events stay visible so you know what is coming back after inventory resets.",
  },
  archive: {
    icon: ArrowRight,
    title: "See what has already closed",
    description: "Past sale history makes the store feel more lived-in and more real.",
  },
};

export default function SalesPage() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Sales"
        title="Buy what is on offer now, watch what is coming next, and skip the guesswork."
        description="This sales menu shows what you can shop immediately, what is launching soon, and what has already closed, so you always know whether to buy now or wait."
      />

      <section className="site-shell mt-10">
        <div className="panel relative overflow-hidden rounded-[36px] px-6 py-8 md:px-8 md:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,195,162,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(125,211,199,0.12),transparent_22%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.34em] text-[var(--veloura-accent)]">Sale Calendar</p>
              <h2 className="font-display text-4xl text-[var(--veloura-text)] md:text-5xl">The easiest way to know whether you should shop now or hold for the next drop.</h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">
                If you want the best current value, start with the live board. If you are shopping for a trip, bridal prep, or a specific event date, the upcoming rail helps you time it properly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="panel-soft rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Live now</p>
                <p className="mt-3 text-3xl text-[var(--veloura-text)]">1</p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">Sale event you can shop immediately.</p>
              </div>
              <div className="panel-soft rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Coming up</p>
                <p className="mt-3 text-3xl text-[var(--veloura-text)]">1</p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">Event worth watching if you want a later drop.</p>
              </div>
              <div className="panel-soft rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-accent)]">Closed</p>
                <p className="mt-3 text-3xl text-[var(--veloura-text)]">2</p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">Past events already completed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell mt-10 grid gap-6">
        {Object.entries(salesBoards).map(([status, items]) => {
          const meta = statusMeta[status as keyof typeof statusMeta];
          const Icon = meta.icon;

          return (
            <div key={status} className="panel rounded-[34px] p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
                <div className="space-y-4">
                  <div className="inline-flex rounded-full border border-[rgba(214,195,162,0.28)] bg-[rgba(214,195,162,0.08)] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[var(--veloura-accent)]">
                    {status}
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-3">
                      <Icon className="h-5 w-5 text-[var(--veloura-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl text-[var(--veloura-text)]">{meta.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--veloura-muted)]">{meta.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {items.map((item) => (
                    <div key={item.title} className="relative overflow-hidden rounded-[26px] border border-[var(--veloura-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="text-2xl text-[var(--veloura-text)]">{item.title}</p>
                        <span className="rounded-full border border-[var(--veloura-line)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--veloura-muted)]">{item.note}</span>
                      </div>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">{item.detail}</p>
                      <Button asChild variant="ghost" className="mt-5 border border-white/10">
                        <Link href={status === "live" ? hairHref("/shop") : hairHref("/sales")}>{item.cta}</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
