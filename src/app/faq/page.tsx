import { FaqList } from "@/components/storefront/faq-list";
import { PageHero } from "@/components/shared/page-hero";
import { storefrontFaqs } from "@/data/catalog";

export default function FaqPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="FAQ" title="Questions clients ask before they spend." description="Expanded answers around shipping, customization, WhatsApp ordering, transfer confirmation, and long-wear product care." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--veloura-accent)]">Need-to-know</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--veloura-muted)]">
            <p>Veloura is built to support quick self-serve checkout and high-touch ordering when a client needs help with density, lace tone, timing, or styling direction.</p>
            <p>The FAQ now covers shipping timing, payment choices, customization windows, event planning, and aftercare expectations more clearly.</p>
          </div>
        </div>
        <FaqList items={storefrontFaqs} />
      </section>
    </div>
  );
}


