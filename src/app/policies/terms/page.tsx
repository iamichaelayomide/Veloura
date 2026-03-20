import { PageHero } from "@/components/shared/page-hero";

export default function TermsPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Policy" title="Terms and conditions" description="Store usage, payment handling, order acceptance, and operational terms." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-2">
        {[
          ["Order acceptance", "Submitting an order does not automatically guarantee final acceptance. Veloura may confirm stock, payment status, customization scope, and delivery or pickup feasibility before fulfillment proceeds."],
          ["Pricing and product detail", "Prices, lengths, densities, and product descriptions are presented as accurately as possible, but availability and promotional pricing may change without prior notice."],
          ["Transfer verification", "Transfer orders remain pending until payment is confirmed. Veloura may request a receipt or additional information before the order moves into processing or pickup preparation."],
          ["Paystack and payment providers", "Online payments processed through third-party providers are subject to those providers' operational and fraud-review processes in addition to Veloura's order checks."],
          ["Pickup and delivery", "Pickup clients must collect within the confirmed window or contact support to reschedule. Delivery timelines may vary due to customization lead times, holidays, or courier events."],
          ["Returns and service communication", "Returns, exchange requests, and post-order concerns are handled according to the relevant store policies. Customers are expected to communicate promptly if there is an order issue."],
        ].map(([title, copy]) => (
          <div key={title} className="panel rounded-[30px] p-6">
            <h2 className="text-2xl text-[var(--veloura-text)]">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--veloura-muted)]">{copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
}


