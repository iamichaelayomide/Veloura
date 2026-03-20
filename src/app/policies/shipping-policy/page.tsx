import { PageHero } from "@/components/shared/page-hero";

export default function ShippingPolicyPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Policy" title="Shipping policy" description="Expanded guidance on dispatch timing, customization delays, Lagos delivery, interstate orders, pickup, and payment confirmation." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-2">
        {[
          [
            "Dispatch timing",
            "Ready-to-ship products usually leave the studio within 24 to 48 hours. Orders that include plucking, tinting, curl setting, styling, or density review may need 2 to 4 additional business days before dispatch.",
          ],
          [
            "Lagos delivery",
            "Standard Lagos delivery generally arrives within 1 to 2 business days after dispatch. Same-day delivery can be arranged for select in-stock orders when payment clears early and routing allows.",
          ],
          [
            "Interstate delivery",
            "Orders outside Lagos usually arrive within 2 to 5 business days after dispatch, depending on destination, courier timing, and whether the order includes customization.",
          ],
          [
            "Transfer and payment confirmation",
            "Bank transfer orders are not moved into fulfillment until payment is confirmed. Clients are encouraged to send proof of payment on WhatsApp immediately after transfer to reduce delay.",
          ],
          [
            "Pickup and handoff",
            "Private pickup is available from the Lekki showroom by appointment. Pickup orders must be confirmed in advance so the team can prepare packaging, accessory additions, and final order checks.",
          ],
          [
            "Shipping exceptions",
            "During major sale periods, public holidays, launch weekends, or courier disruptions, dispatch and delivery windows may run longer than normal. Veloura will communicate material delays by email or WhatsApp.",
          ],
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


