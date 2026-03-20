import Link from "next/link";

import { siteConfig } from "@/config/site";
import { hairHref } from "@/lib/routes";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { href: hairHref("/shop"), label: "All Products" },
      { href: hairHref("/services"), label: "Services" },
      { href: hairHref("/sales"), label: "Sales" },
      { href: hairHref("/collections/new-arrivals"), label: "New Arrivals" },
      { href: hairHref("/collections/best-sellers"), label: "Best Sellers" },
      { href: hairHref("/categories/wigs"), label: "Wigs" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: hairHref("/faq"), label: "FAQ" },
      { href: hairHref("/contact"), label: "Contact" },
      { href: hairHref("/policies/shipping-policy"), label: "Shipping Policy" },
      { href: hairHref("/policies/return-policy"), label: "Return Policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: hairHref("/about"), label: "About" },
      { href: hairHref("/account"), label: "Account" },
      { href: hairHref("/policies/privacy-policy"), label: "Privacy Policy" },
      { href: hairHref("/policies/terms"), label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--veloura-line)] bg-[rgba(5,7,11,0.95)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">{siteConfig.name}</p>
          <h3 className="font-display text-3xl text-[var(--veloura-text)]">Quiet glamour, stronger service, cleaner commerce.</h3>
          <p className="max-w-md text-sm leading-7 text-[var(--veloura-muted)]">
            Veloura pairs private-client energy with practical support, so every wig, bundle, frontal, and finishing essential feels considered before and after checkout.
          </p>
          <div className="panel-soft inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--veloura-muted)]">Lekki showroom by appointment</div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--veloura-accent)]">{group.title}</p>
            <div className="mt-4 space-y-3">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-[var(--veloura-muted)] transition hover:text-[var(--veloura-text)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}




