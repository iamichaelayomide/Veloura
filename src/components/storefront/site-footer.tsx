import Link from "next/link";

import { siteConfig } from "@/config/site";
import { hairHref } from "@/lib/routes";

const footerGroups = [
  {
    title: "Shop",
    links: [
      { href: hairHref("/shop"), label: "All Products" },
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
    <footer className="mt-24 border-t border-white/10 bg-[#0d0908]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c58b74]">{siteConfig.name}</p>
          <h3 className="font-display text-3xl text-[#f8efe8]">Luxury hair without noise.</h3>
          <p className="max-w-md text-sm leading-7 text-[#bca79d]">
            Premium textures, elegant construction, and a storefront built to make selecting your next install feel calm, clear, and expensive in the right way.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm uppercase tracking-[0.25em] text-[#e5c2b1]">{group.title}</p>
            <div className="mt-4 space-y-3">
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-[#bca79d] transition hover:text-[#f8efe8]">
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




