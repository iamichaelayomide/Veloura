import { SectionHeading } from "@/components/shared/section-heading";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="site-shell pt-8 md:pt-10">
      <div className="panel veloura-grid relative overflow-hidden rounded-[36px] p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,195,162,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(125,211,199,0.12),transparent_24%)]" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {actions ? <div>{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}


