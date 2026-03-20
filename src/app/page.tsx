import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles, Ticket, Truck } from "lucide-react";

import { FaqList } from "@/components/storefront/faq-list";
import { HomeProductShowcase } from "@/components/storefront/home-product-showcase";
import { NewsletterBlock } from "@/components/storefront/newsletter-block";
import { ProductCard } from "@/components/storefront/product-card";
import { ServiceCard } from "@/components/storefront/service-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { categories, collections, homepageTestimonials, storefrontFaqs } from "@/data/catalog";
import { getAllProducts, getBestSellerProducts, getFeaturedProducts, getNewArrivalProducts } from "@/lib/catalog";
import { getFeaturedServices } from "@/lib/services";
import { hairHref } from "@/lib/routes";

const serviceNotes = [
  { title: "Shop with clarity", copy: "See the lengths, finishes, and details that help you decide faster." },
  { title: "Get help fast", copy: "Ask questions on WhatsApp, choose transfer, or pay online without confusion." },
  { title: "Leave with the right look", copy: "Pick ready-to-wear units, fuller wigs, or softer textures based on how you want to look." },
];

const trustPoints = [
  { label: "Guidance when you are unsure what to buy", icon: Sparkles },
  { label: "Delivery or pickup depending on what suits you", icon: Truck },
  { label: "Simple support and payment options", icon: ShieldCheck },
];

const homeAnchors = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#sales-support", label: "Sales" },
  { href: "#faq", label: "Support" },
  { href: "#visit-store", label: "Visit Store" },
];

const startPaths = [
  {
    title: "Shop products",
    copy: "Go straight into wigs, bundles, frontals, closures, and accessories.",
    href: hairHref("/shop"),
    cta: "Open shop",
  },
  {
    title: "Check sales",
    copy: "See what is live now, what is coming next, and what is already closed.",
    href: hairHref("/sales"),
    cta: "View sales",
  },
  {
    title: "Book services",
    copy: "Choose hair, lash, or pedicure appointments and pay to lock the booking.",
    href: hairHref("/services"),
    cta: "Book services",
  },
  {
    title: "Get support",
    copy: "Use FAQ, WhatsApp, pickup guidance, and store directions when you need help before buying.",
    href: hairHref("/faq"),
    cta: "Get answers",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellerProducts();
  const newArrivals = getNewArrivalProducts();
  const allProducts = getAllProducts();
  const featuredServices = getFeaturedServices();

  return (
    <div className="pb-16">
      <section className="site-shell pt-8">
        <div className="panel veloura-grid relative overflow-hidden rounded-[36px] px-5 py-7 md:rounded-[44px] md:px-10 md:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,195,162,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(125,211,199,0.14),transparent_20%)]" />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative z-10 space-y-7 animate-fade-up">
              <div className="panel-soft inline-flex rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.36em] text-[var(--veloura-accent)]">
                Luxury Hair And Beauty
              </div>
              <div className="space-y-5">
                <h1 className="font-display text-4xl leading-[0.92] text-[var(--veloura-text)] sm:text-5xl md:text-7xl">
                  Find the hair
                  <br />
                  that makes you
                  <br />
                  feel finished.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[var(--veloura-muted)] md:text-base md:leading-8">
                  Shop wigs, bundles, frontals, closures, and accessories with clearer detail, better support, and easier checkout paths so you can buy with less hesitation.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={hairHref("/shop")}>Shop the collection</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://www.google.com/maps/search/?api=1&query=12A+Admiralty+Way,+Lekki+Phase+1,+Lagos" target="_blank" rel="noreferrer">
                    Get store directions
                  </a>
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {serviceNotes.map((note) => (
                  <div key={note.title} className="panel-soft rounded-[22px] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">{note.title}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--veloura-muted)]">{note.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:gap-6">
              <div className="relative overflow-hidden rounded-[28px] border border-[var(--veloura-line)] md:animate-float md:rounded-[34px]">
                <div className="relative aspect-[4/5]">
                  <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80" alt="Veloura editorial luxury hair" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-[#090b11]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Private Client Edit</p>
                    <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)] md:text-4xl">Choose the look people notice first.</h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[var(--veloura-muted)]">From fuller wigs to softer bundles and polished finishing pieces, this is where you shop when you want your hair to look intentional, not average.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.label} className="panel-soft rounded-[22px] p-5 md:rounded-[26px]">
                      <Icon className="h-5 w-5 text-[var(--veloura-accent)]" />
                      <p className="mt-4 text-sm leading-7 text-[var(--veloura-text)]">{point.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell pt-6">
        <div className="panel flex gap-3 overflow-x-auto rounded-[24px] px-4 py-4 text-sm text-[var(--veloura-muted)]">
          {homeAnchors.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 rounded-full border border-[var(--veloura-line)] px-4 py-2 transition hover:border-[rgba(214,195,162,0.4)] hover:text-[var(--veloura-text)]">
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section className="site-shell pt-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {startPaths.map((path) => (
            <div key={path.title} className="panel rounded-[26px] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">{path.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{path.copy}</p>
              <Button asChild variant="ghost" className="mt-4 border border-white/10">
                <Link href={path.href}>{path.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <HomeProductShowcase categories={categories} products={allProducts} />

      <section className="site-shell pt-14">
        <SectionHeading eyebrow="Best Sellers" title="Start here if you want the safest picks." description="These are the wigs and textures shoppers keep choosing when they want fullness, softness, and a finish that looks worth the money." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section id="services" className="site-shell pt-14">
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="panel rounded-[30px] p-6 md:rounded-[34px] md:p-8">
            <SectionHeading eyebrow="Services" title="Need an appointment, not a product?" description="Book hairdressing, lash, and pedicure services in a separate service lane with visible time slots and payment-confirmed booking." />
            <div className="mt-6 space-y-4">
              {["Choose a service category first", "See available day and time before paying", "Use payment to lock the booking"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[var(--veloura-muted)]">
                  <Check className="h-4 w-4 text-[var(--veloura-highlight)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6">
              <Link href={hairHref("/services")}>Browse services</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_.98fr]">
          <div className="panel rounded-[30px] p-6 md:rounded-[34px] md:p-8">
            <SectionHeading eyebrow={collections[2].eyebrow} title="Shop by the occasion you are dressing for." description="If you are buying for a birthday, bridal event, trip, or content day, this edit helps you go straight to the options that already feel dressed up." />
            <p className="mt-6 text-sm leading-7 text-[var(--veloura-muted)]">
              When you do not want to overthink it, start with these lengths, finishes, and accessory picks that make event hair easier to pull together.
            </p>
            <Button asChild className="mt-8">
              <Link href={hairHref(`/collections/${collections[2].slug}`)}>Shop by occasion</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="site-shell pt-14">
        <SectionHeading eyebrow="New Arrivals" title="See what is new before it sells through." description="Fresh textures, ready-to-wear options, and accessories for shoppers who want newer drops first." />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section id="sales-support" className="site-shell pt-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="panel rounded-[30px] p-6">
            <Ticket className="h-5 w-5 text-[var(--veloura-accent)]" />
            <h3 className="mt-4 font-display text-3xl text-[var(--veloura-text)]">See what is on sale.</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">If you want to shop current offers without searching the full store, start with the sales board.</p>
            <Button asChild className="mt-5">
              <Link href={hairHref("/sales")}>Open sales</Link>
            </Button>
          </div>

          <div className="panel rounded-[30px] p-6">
            <Check className="h-5 w-5 text-[var(--veloura-accent)]" />
            <h3 className="mt-4 font-display text-3xl text-[var(--veloura-text)]">Need help choosing?</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">Go to the FAQ or WhatsApp route if you want fewer surprises before checkout.</p>
            <Button asChild className="mt-5">
              <Link href={hairHref("/faq")}>Get support</Link>
            </Button>
          </div>

          <div className="panel rounded-[30px] p-6">
            <Truck className="h-5 w-5 text-[var(--veloura-accent)]" />
            <h3 className="mt-4 font-display text-3xl text-[var(--veloura-text)]">Prefer pickup or delivery?</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">Check your options before paying so the order flow feels simpler from the start.</p>
            <Button asChild className="mt-5">
              <Link href={hairHref("/checkout")}>See checkout options</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="site-shell pt-14">
        <SectionHeading eyebrow="Reviews" title="See why other shoppers were confident buying here." description="Quick feedback from customers who wanted fuller units, easier checkout, and a more premium finish." />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {homepageTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="panel rounded-[30px] p-6">
              <p className="text-sm leading-7 text-[var(--veloura-text)]">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm text-[var(--veloura-text)]">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">
                  {testimonial.location} | {testimonial.install}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="site-shell pt-14">
        <SectionHeading eyebrow="FAQ" title="Get the answers you need before you spend." description="Read through delivery, pickup, payment, customisation, and aftercare details if you want fewer surprises after checkout." />
        <div className="mt-8">
          <FaqList items={storefrontFaqs} />
        </div>
      </section>

      <section className="site-shell pt-14">
        <NewsletterBlock />
      </section>

      <section id="visit-store" className="site-shell pt-14">
        <div className="panel rounded-[30px] p-6 md:rounded-[34px] md:p-8">
          <SectionHeading eyebrow="Walk-In Store" title="Prefer to come in physically first?" description="Visit the Lekki store for walk-in questions, showroom pickup, or in-person help before you place the order." />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p>Address: 12A Admiralty Way, Lekki Phase 1, Lagos.</p>
              <p>Come in if you want to ask questions face to face, confirm your pickup, or get help deciding what texture, length, or finish fits you best.</p>
            </div>
            <div className="space-y-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p>From Admiralty Circle, head toward Admiralty Way and ask for 12A. Once your pickup order is confirmed, we hold it for your reservation window at the store.</p>
              <Button asChild className="mt-2">
                <a href="https://www.google.com/maps/search/?api=1&query=12A+Admiralty+Way,+Lekki+Phase+1,+Lagos" target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
