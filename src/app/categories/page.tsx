import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { categories } from "@/data/catalog";
import { hairHref } from "@/lib/routes";

export default function CategoriesPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Categories" title="Every product family, clearly arranged." description="Browse wigs, bundles, frontals, closures, accessories, and care products without marketplace clutter." />
      <section className="site-shell mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={hairHref(`/categories/${category.slug}`)} className="panel overflow-hidden rounded-[28px]">
            <div className="relative aspect-[5/4]">
              <Image src={category.image} alt={category.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">{category.accent}</p>
              <h2 className="mt-3 text-2xl text-[var(--veloura-text)]">{category.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{category.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}




