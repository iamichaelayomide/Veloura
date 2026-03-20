"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { hairHref } from "@/lib/routes";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const primaryLinks = [
  { href: hairHref("/shop"), label: "Shop" },
  { href: hairHref("/collections/new-arrivals"), label: "New Arrivals" },
  { href: hairHref("/collections/best-sellers"), label: "Best Sellers" },
  { href: hairHref("/categories/wigs"), label: "Wigs" },
  { href: hairHref("/categories/bundles"), label: "Bundles" },
  { href: hairHref("/categories/frontals"), label: "Frontals" },
];

const drawerLinks = [
  ...primaryLinks,
  { href: hairHref("/categories/closures"), label: "Closures" },
  { href: hairHref("/categories/accessories"), label: "Accessories" },
  { href: hairHref("/about"), label: "About" },
  { href: hairHref("/faq"), label: "FAQ" },
  { href: hairHref("/contact"), label: "Contact" },
  { href: hairHref("/account"), label: "Account" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#120d0ccc]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <button
            aria-label="Open navigation"
            className="rounded-full border border-white/10 p-2 text-[#f5ede7]"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <Link href={hairHref()} className="flex items-center gap-3">
          <div className="rounded-full border border-[#c58b74]/50 px-3 py-1 text-xs uppercase tracking-[0.4em] text-[#c58b74]">
            {siteConfig.name}
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[#f3e8df] transition hover:text-[#c58b74]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={hairHref("/search")} className="rounded-full border border-white/10 p-2 text-[#f5ede7] transition hover:border-[#c58b74]">
            <Search className="h-4 w-4" />
          </Link>
          <Link href={hairHref("/wishlist")} className="relative rounded-full border border-white/10 p-2 text-[#f5ede7] transition hover:border-[#c58b74]">
            <Heart className="h-4 w-4" />
            {wishlistCount ? <span className="absolute -right-1 -top-1 rounded-full bg-[#c58b74] px-1.5 text-[10px] text-black">{wishlistCount}</span> : null}
          </Link>
          <Link href={hairHref("/account")} className="rounded-full border border-white/10 p-2 text-[#f5ede7] transition hover:border-[#c58b74]">
            <User className="h-4 w-4" />
          </Link>
          <Link href={hairHref("/cart")} className="relative rounded-full border border-white/10 p-2 text-[#f5ede7] transition hover:border-[#c58b74]">
            <ShoppingBag className="h-4 w-4" />
            {cartCount ? <span className="absolute -right-1 -top-1 rounded-full bg-[#c58b74] px-1.5 text-[10px] text-black">{cartCount}</span> : null}
          </Link>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden">
          <div className="ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-white/10 bg-[#120d0c] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-[#c58b74]">{siteConfig.name}</p>
              <button
                aria-label="Close navigation"
                className="rounded-full border border-white/10 p-2 text-[#f5ede7]"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {drawerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-lg text-[#f5ede7]" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6 text-sm text-[#bca79d]">
              <p>{siteConfig.address}</p>
              <p>{siteConfig.phone}</p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}




