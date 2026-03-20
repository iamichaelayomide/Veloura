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
      copy: "Start with the appointment that matches the look or reset you want.",
      Icon: Sparkles,
    },
    {
      title: "Pick your stylist",
      copy: "Open any service to compare available hairdressers, reviews, and next open dates.",
      Icon: CalendarDays,
    },
    {
      title: "Pay to book",
      copy: "Choose your day and time, then confirm the appointment with payment.",
      Icon: Clock3,
    },
  ];

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Services"
        title="Book your appointment with the stylist and time that suit you."
        description="Choose a service, compare available hairdressers, read reviews, and book the day and time you want."
        actions={
          <Button asChild>
            <a href="#service-list">Browse appointments</a>
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
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Appointment categories</p>
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
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Most booked</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Start with the appointments clients book most often.</h2>
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
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">Open any appointment to choose from the available hairdressers, see reviews, and lock your preferred date and time.</p>
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
