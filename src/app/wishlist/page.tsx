import { WishlistView } from "@/components/storefront/wishlist-view";
import { PageHero } from "@/components/shared/page-hero";

export default function WishlistPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Wishlist" title="Saved for later, still styled properly." description="Keep the products you want to compare, revisit, or move into checkout later." />
      <section className="site-shell mt-10">
        <WishlistView />
      </section>
    </div>
  );
}


