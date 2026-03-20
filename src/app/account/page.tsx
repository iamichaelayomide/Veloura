import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { SurfaceCard } from "@/components/shared/surface-card";
import { hairHref } from "@/lib/routes";

const accountLinks = [
  { href: hairHref("/account/profile"), title: "Profile", description: "Update customer identity, contact details, and preferences." },
  { href: hairHref("/account/orders"), title: "Orders", description: "Track current orders and revisit previous purchases." },
  { href: hairHref("/account/addresses"), title: "Addresses", description: "Manage saved delivery destinations and defaults." },
  { href: hairHref("/account/security"), title: "Security", description: "Password changes and account access controls." },
  { href: hairHref("/account/wishlist"), title: "Wishlist", description: "Saved items and product recall." },
];

export default function AccountPage() {
  return (
    <div className="pb-16">
      <PageHero eyebrow="Account" title="Everything after the first purchase." description="Profile management, order history, addresses, security, and wishlist access." />
      <section className="site-shell mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {accountLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <SurfaceCard className="h-full p-6">
              <h2 className="text-2xl text-[#f8efe8]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#bca79d]">{item.description}</p>
            </SurfaceCard>
          </Link>
        ))}
      </section>
    </div>
  );
}




