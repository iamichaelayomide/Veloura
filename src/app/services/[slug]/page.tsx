import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { RatingStars } from "@/components/shared/rating-stars";
import { ServiceBookingExperience } from "@/components/storefront/service-booking-experience";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { getServiceBySlug } from "@/lib/services";
import { formatDurationHours, formatPrice } from "@/lib/utils";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Appointment"
        title={service.name}
        description={`${service.shortDescription} Choose from available hairdressers, read reviews, and book your preferred day and time in one flow.`}
      />

      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.9fr]">
        <div className="space-y-6">
          <div className="panel rounded-[30px] p-6">
            <h2 className="font-display text-4xl text-[var(--veloura-text)]">What to expect</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">{service.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Includes</p>
                <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--veloura-muted)]">
                  {service.includes.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Best for</p>
                <div className="mt-3 space-y-2 text-sm leading-7 text-[var(--veloura-muted)]">
                  {service.benefits.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {service.gallery.map((image, index) => (
              <div key={image} className="relative overflow-hidden rounded-[28px] border border-[var(--veloura-line)]">
                <div className="relative aspect-[5/4]">
                  <Image src={image} alt={`${service.name} ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 35vw" />
                </div>
              </div>
            ))}
          </div>

          <div className="panel rounded-[30px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Hairdressers</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.stylists.map((stylist) => (
                <Link
                  key={stylist.id}
                  href={hairHref(`/hairdressers/${stylist.id}`)}
                  className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.06)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                    <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 22vw" />
                  </div>
                  <p className="mt-4 text-base text-[var(--veloura-text)]">{stylist.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">{stylist.title}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <RatingStars rating={stylist.rating} />
                    <p className="text-sm text-[var(--veloura-text)]">{stylist.rating.toFixed(1)}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--veloura-muted)]">{stylist.bio}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="panel h-fit rounded-[30px] p-6 lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Appointment summary</p>
          <div className="mt-5 space-y-3 text-sm text-[var(--veloura-muted)]">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{formatPrice(service.price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>{formatDurationHours(service.durationMinutes)}</span>
            </div>
            <div className="flex justify-between">
              <span>Hairdressers</span>
              <span>{service.stylists.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Open times</span>
              <span>{service.availability.filter((slot) => slot.available).length}</span>
            </div>
          </div>
          <div className="mt-6 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
            {service.bookingNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
          <Button asChild className="mt-6 w-full">
            <a href="#booking-flow">Book appointment</a>
          </Button>
        </div>
      </section>

      <div id="booking-flow">
        <ServiceBookingExperience service={service} />
      </div>
    </div>
  );
}
