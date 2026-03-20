import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Contact" title="Support, showroom directions, and walk-in store information." description="Reach the team through form, WhatsApp, or email, or come through the physical Veloura store in Lekki." />
      <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <form className="panel space-y-4 rounded-[28px] p-6">
          <Input placeholder="Your name" />
          <Input placeholder="Email address" type="email" />
          <Input placeholder="Phone number" />
          <Textarea placeholder="Tell us what you need help with" />
          <Button type="submit">Send message</Button>
        </form>
        <div className="panel space-y-4 rounded-[28px] p-6 text-sm text-[var(--veloura-muted)]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">WhatsApp</p>
            <p className="mt-2 text-[var(--veloura-text)]">{siteConfig.phone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Email</p>
            <p className="mt-2 text-[var(--veloura-text)]">{siteConfig.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Showroom</p>
            <p className="mt-2 text-[var(--veloura-text)]">{siteConfig.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Hours</p>
            <p className="mt-2 text-[var(--veloura-text)]">Mon to Sat, 10 AM to 7 PM</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Directions</p>
            <p className="mt-2 text-[var(--veloura-text)]">From Admiralty Circle, continue toward Admiralty Way and ask for 12A Admiralty Way, Lekki Phase 1.</p>
            <a href={siteConfig.maps} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-[var(--veloura-accent)]">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


