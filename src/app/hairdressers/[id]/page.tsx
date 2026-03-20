import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/shared/page-hero";
import { RatingStars } from "@/components/shared/rating-stars";
import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { getStylistById } from "@/lib/services";

export default async function HairdresserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stylist = getStylistById(id);

  if (!stylist) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Hairdresser Profile"
        title={stylist.name}
        description={`${stylist.title}. Read through the profile, scan the reviews, then book the appointment that fits the look you want.`}
        actions={
          <Button asChild>
            <Link href={hairHref(`/services/${stylist.services[0]?.slug ?? "services"}?stylist=${stylist.id}#booking-flow`)}>Book appointment</Link>
          </Button>
        }
      />

      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="panel overflow-hidden rounded-[30px]">
            <div className="relative aspect-[4/5]">
              <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 36vw" />
            </div>
          </div>

          <div className="panel rounded-[30px] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Services</p>
            <div className="mt-4 grid gap-3">
              {stylist.services.map((service) => (
                <Link
                  key={service.id}
                  href={hairHref(`/services/${service.slug}?stylist=${stylist.id}#booking-flow`)}
                  className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 transition hover:border-[rgba(214,195,162,0.36)] hover:bg-[rgba(214,195,162,0.06)]"
                >
                  <p className="text-base text-[var(--veloura-text)]">{service.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel rounded-[30px] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">{stylist.title}</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">About {stylist.name}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">{stylist.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <RatingStars rating={stylist.rating} />
              <p className="text-sm text-[var(--veloura-text)]">{stylist.rating.toFixed(1)} average from {stylist.reviewCount} reviews</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {stylist.specialties.map((specialty) => (
                <span key={specialty} className="rounded-full border border-[var(--veloura-line)] px-4 py-2 text-sm text-[var(--veloura-text)]">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="panel rounded-[30px] p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Client reviews</p>
                <h3 className="mt-3 font-display text-3xl text-[var(--veloura-text)]">Scroll through what clients said.</h3>
              </div>
            </div>

            <div className="mt-6 max-h-[520px] space-y-4 overflow-y-auto pr-2">
              {stylist.reviews.map((review) => (
                <div key={review.id} className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-[var(--veloura-text)]">{review.customer}</p>
                    <div className="flex items-center gap-3">
                      <RatingStars rating={review.rating} />
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">{review.date}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">&ldquo;{review.comment}&rdquo;</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={hairHref(`/services/${stylist.services[0]?.slug ?? "services"}?stylist=${stylist.id}#booking-flow`)}>Book appointment</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={hairHref("/services")}>All services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
