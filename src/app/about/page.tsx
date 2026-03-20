import { PageHero } from "@/components/shared/page-hero";

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="About Veloura" title="Premium hair with editorial discipline." description="We built Veloura for women who want beauty commerce to feel elevated, trustworthy, and easy to navigate." />
      <section className="site-shell mt-10 grid gap-6 lg:grid-cols-3">
        {[
          ["Brand Story", "Veloura curates premium wigs, bundles, closures, and lace pieces with an emphasis on realistic finish, polished texture, and long-wear confidence."],
          ["Quality Promise", "Every product is selected for softness, density balance, and styling performance so the result feels as good in person as it looks online."],
          ["Sourcing Trust", "We prioritise virgin and raw donor sourcing, accurate variant descriptions, and care guidance that supports repeat wear rather than one-time installs."],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-[28px] border border-white/10 bg-[#120c0b] p-6">
            <h2 className="text-2xl text-[#f8efe8]">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#bca79d]">{copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
}


