import { CalendarDays, Clock3, Sparkles } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/storefront/service-card";
import { Button } from "@/components/ui/button";
import { getAllServices, getFeaturedServices } from "@/lib/services";
import { serviceCategories } from "@/data/catalog";

export default function ServicesPage() {
  const services = getAllServices();
  const featuredServices = getFeaturedServices();
  const serviceSteps = [
    {
      title: "Choose a service",
      copy: "Pick hairdressing, lashes, or pedicure based on what you need finished.",
      Icon: Sparkles,
    },
    {
      title: "See availability",
      copy: "Review the day, time, and stylist before you commit to the appointment.",
      Icon: CalendarDays,
    },
    {
      title: "Pay to book",
      copy: "The booking is only confirmed after payment, so the slot stays tied to a real checkout step.",
      Icon: Clock3,
    },
  ];

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Services"
        title="Book appointments for hair, lashes, and beauty services without leaving the site."
        description="Choose the service you want, see the available days and time slots, then complete payment to lock the booking."
        actions={
          <Button asChild>
            <a href="#service-list">Browse services</a>
          </Button>
        }
      />

      <section className="site-shell mt-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {serviceSteps.map(({ title, copy, Icon }) => {
            return (
              <div key={title} className="panel rounded-[28px] p-5">
                <Icon className="h-5 w-5 text-[var(--veloura-accent)]" />
                <h2 className="mt-4 text-2xl text-[var(--veloura-text)]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="site-shell mt-10">
        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Service categories</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <span key={category.id} className="rounded-full border border-[var(--veloura-line)] px-4 py-2 text-sm text-[var(--veloura-muted)]">
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Featured bookings</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Start with the appointments people are most likely to book first.</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section id="service-list" className="site-shell mt-10">
        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">All services</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">Separate from products, this is the service lane. Use it when you want to book an appointment instead of buying physical hair or accessories.</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
