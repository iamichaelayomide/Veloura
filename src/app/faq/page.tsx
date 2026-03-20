import { FaqList } from "@/components/storefront/faq-list";
import { PageHero } from "@/components/shared/page-hero";
import { storefrontFaqs } from "@/data/catalog";

export default function FaqPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="FAQ" title="Shipping, returns, care, customization, and payment." description="The core operational questions customers ask before conversion, answered cleanly." />
      <section className="site-shell mt-10">
        <FaqList items={storefrontFaqs} />
      </section>
    </div>
  );
}


