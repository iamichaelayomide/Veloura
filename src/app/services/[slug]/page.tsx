import { notFound } from "next/navigation";
import Image from "next/image";

import { PageHero } from "@/components/shared/page-hero";
import { ServiceBookingExperience } from "@/components/storefront/service-booking-experience";
import { getServiceBySlug } from "@/lib/services";
import { formatPrice } from "@/lib/utils";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Service Booking"
        title={service.name}
        description={`${service.shortDescription} Payment confirms the appointment, so you can choose your slot and finish the booking in one flow.`}
      />

      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.9fr]">
        <div className="space-y-6">
          <div className="panel rounded-[30px] p-6">
            <h2 className="font-display text-4xl text-[var(--veloura-text)]">What this service helps you do</h2>
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
        </div>

        <div className="panel h-fit rounded-[30px] p-6 lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Service summary</p>
          <div className="mt-5 space-y-3 text-sm text-[var(--veloura-muted)]">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{formatPrice(service.price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>{service.durationMinutes} mins</span>
            </div>
            <div className="flex justify-between">
              <span>Slots available</span>
              <span>{service.availability.filter((slot) => slot.available).length}</span>
            </div>
          </div>
          <div className="mt-6 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
            {service.bookingNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      <ServiceBookingExperience service={service} />
    </div>
  );
}
