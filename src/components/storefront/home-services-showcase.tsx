"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { formatDurationHours, formatPrice } from "@/lib/utils";
import type { Service } from "@/types";

export function HomeServicesShowcase({ services }: { services: Service[] }) {
  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id ?? "");

  const activeService = useMemo(
    () => services.find((service) => service.id === activeServiceId) ?? services[0],
    [activeServiceId, services],
  );

  if (!activeService) {
    return null;
  }

  const firstStylist = activeService.stylists[0];
  const firstOpenSlot = activeService.availability.find((slot) => slot.available);

  return (
    <section id="services" className="site-shell pt-14">
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="panel rounded-[30px] p-6 md:p-8">
          <SectionHeading
            eyebrow="Appointments"
            title="Tap a service and the details change."
            description="Choose the appointment you want, preview the stylists, then open the booking flow when you are ready."
          />
          <div className="mt-6 grid gap-3">
            {services.map((service) => {
              const isActive = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  className={`rounded-[22px] border p-4 text-left transition ${
                    isActive
                      ? "border-[rgba(214,195,162,0.55)] bg-[rgba(214,195,162,0.14)] shadow-[0_0_0_1px_rgba(214,195,162,0.12)]"
                      : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base text-[var(--veloura-text)]">{service.name}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">{service.shortDescription}</p>
                    </div>
                    <span className="text-sm text-[var(--veloura-text)]">{formatPrice(service.price)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="panel overflow-hidden rounded-[30px]">
          <div className="grid lg:grid-cols-[1.02fr_.98fr]">
            <div className="relative min-h-[280px]">
              <Image src={activeService.image} alt={activeService.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-[#090b11]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Now showing</p>
                <h3 className="mt-3 font-display text-3xl text-[var(--veloura-text)]">{activeService.name}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--veloura-muted)]">{activeService.description}</p>
              </div>
            </div>

            <div className="space-y-5 p-5 md:p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">From</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{formatPrice(activeService.price)}</p>
                </div>
                <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">Duration</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{formatDurationHours(activeService.durationMinutes)}</p>
                </div>
                <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">Next slot</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{firstOpenSlot?.dayLabel ?? "Open soon"}</p>
                </div>
              </div>

              {firstStylist ? (
                <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Available hairdressers</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {activeService.stylists.slice(0, 3).map((stylist) => (
                      <Link
                        key={stylist.id}
                        href={hairHref(`/hairdressers/${stylist.id}`)}
                        className="rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(8,11,18,0.55)] p-4 transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)]"
                      >
                        <p className="text-sm text-[var(--veloura-text)]">{stylist.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--veloura-accent)]">{stylist.title}</p>
                        <p className="mt-3 text-sm leading-6 text-[var(--veloura-muted)]">{stylist.rating.toFixed(1)} / 5</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={hairHref(`/services/${activeService.slug}`)}>Book appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={hairHref("/services")}>All services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
