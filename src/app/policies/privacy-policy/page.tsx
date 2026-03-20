import { PageHero } from "@/components/shared/page-hero";

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Policy" title="Privacy policy" description="Customer data, transaction events, and account information handling." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-2">
        {[
          ["What we collect", "Veloura may collect name, email, phone number, address, order details, payment references, customer service messages, and order-related receipts needed to fulfill or verify an order."],
          ["How we use data", "We use customer information to process orders, coordinate delivery or pickup, verify transfers, respond on WhatsApp, provide support, and improve storefront operations."],
          ["Receipts and transfers", "When a customer uploads a transfer receipt, the file and related order details may be stored so the team can verify payment and maintain an internal record of the transaction."],
          ["Marketing and communication", "Customers may receive service-related messages about checkout, fulfillment, pickup, delivery, or support. Promotional communication is handled separately and can be limited by the customer."],
          ["Data sharing", "Veloura does not sell customer data. Limited information may be shared with payment providers, delivery partners, and infrastructure services when required to complete an order."],
          ["Security and retention", "We use reasonable operational safeguards to store customer records, but customers should avoid sending unnecessary sensitive information through public channels."],
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


