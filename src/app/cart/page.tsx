import { CartView } from "@/components/storefront/cart-view";
import { PageHero } from "@/components/shared/page-hero";

export default function CartPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Cart" title="A premium basket without the clutter." description="Review variant details, update quantities, and move directly into checkout." />
      <section className="site-shell mt-10">
        <CartView />
      </section>
    </div>
  );
}


