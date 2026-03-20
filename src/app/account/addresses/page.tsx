import { PageHero } from "@/components/shared/page-hero";

export default function AccountAddressesPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Addresses" title="Saved delivery addresses" description="Store and reuse customer delivery details for faster checkout." />
      <section className="site-shell mt-10 rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
        <p className="text-sm leading-7 text-[#bca79d]">Admiralty Way, Lekki Phase 1, Lagos. Default address for premium dispatch and WhatsApp updates.</p>
      </section>
    </div>
  );
}


