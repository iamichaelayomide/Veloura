import { WishlistView } from "@/components/storefront/wishlist-view";
import { PageHero } from "@/components/shared/page-hero";

export default function AccountWishlistPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Wishlist" title="Saved products from your account" description="Revisit saved items without losing premium browsing context." />
      <section className="site-shell mt-10">
        <WishlistView />
      </section>
    </div>
  );
}


