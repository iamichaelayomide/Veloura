import { SectionHeading } from "@/components/shared/section-heading";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="site-shell pt-14">
      <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(47,31,28,0.95),rgba(18,12,11,0.98))] p-8 md:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {actions ? <div>{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}


