import { PageHero } from "@/components/shared/page-hero";
import { WhatsAppCheckout } from "@/components/storefront/whatsapp-checkout";

export default async function WhatsAppPage({ searchParams }: { searchParams: Promise<{ fulfillment?: string }> }) {
  const params = await searchParams;

  return (
    <div className="pb-16">
      <PageHero eyebrow="WhatsApp" title="Preview the order before customer service takes over." description="Review the basket, adjust your path, or continue directly to the real WhatsApp support line." />
      <WhatsAppCheckout fulfillment={params.fulfillment} />
    </div>
  );
}
