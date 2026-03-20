import { Compass, MapPin, Sparkles, Store } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const pillars = [
  {
    title: "Editorial standard",
    copy: "Veloura is built around products that look finished under daylight, event lighting, and close content capture. The storefront now carries that same discipline in how it presents every product and policy.",
    icon: Sparkles,
  },
  {
    title: "Walk-in store",
    copy: "We are not only online. The physical Veloura store gives clients a place to walk in, collect pickup orders, ask questions in person, and get clearer direction before spending.",
    icon: Store,
  },
  {
    title: "Clearer service flow",
    copy: "From card checkout to transfer confirmation and WhatsApp-assisted orders, the goal is to make every route feel deliberate, visible, and easier to trust.",
    icon: Compass,
  },
];

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="About Veloura" title="A luxury hair house with a real storefront, stronger service, and cleaner digital flow." description="The new Veloura is less generic beauty-shop energy and more private-client confidence, from the first scroll to the final handoff." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="panel rounded-[34px] p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-[var(--veloura-accent)]">Why we exist</p>
          <p className="mt-5 text-base leading-8 text-[var(--veloura-muted)]">
            Veloura was created for women who care about finish, fullness, and how the entire purchase feels. The product matters, but so does the context around it: the clarity of the catalog, the accuracy of the product detail, the calmness of support, and the confidence that there is a real place and a real team behind the order.
          </p>
          <div className="mt-8 rounded-[28px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-[var(--veloura-accent)]" />
              <div>
                <p className="text-lg text-[var(--veloura-text)]">Visit the walk-in store</p>
                <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{siteConfig.address}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">Clients can walk in, reserve physical pickup, or speak with support before placing a higher-touch order.</p>
              </div>
            </div>
          </div>
          <Button asChild className="mt-8">
            <a href={siteConfig.maps} target="_blank" rel="noreferrer">
              Get showroom directions
            </a>
          </Button>
        </div>

        <div className="grid gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="panel rounded-[30px] p-6">
                <Icon className="h-5 w-5 text-[var(--veloura-accent)]" />
                <h2 className="mt-4 text-2xl text-[var(--veloura-text)]">{pillar.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">{pillar.copy}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
