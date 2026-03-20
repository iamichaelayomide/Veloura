"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";
import { hairHref } from "@/lib/routes";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

const primaryLinks = [
  { href: hairHref("/sales"), label: "Sales" },
  { href: hairHref("/collections/best-sellers"), label: "Best Sellers" },
];

const productLinks = [
  { href: hairHref("/shop"), label: "All products" },
  { href: hairHref("/categories/wigs"), label: "Wigs" },
  { href: hairHref("/categories/accessories"), label: "Accessories" },
  { href: hairHref("/categories/closures"), label: "Closures" },
  { href: hairHref("/categories/frontals"), label: "Frontals" },
  { href: hairHref("/categories/bundles"), label: "Bundles" },
];

const serviceLinks = [
  { href: hairHref("/services"), label: "All services" },
  { href: hairHref("/services/signature-wig-install"), label: "Hair styling" },
  { href: hairHref("/services/silk-press-and-hair-styling"), label: "Silk press" },
  { href: hairHref("/services/wispy-lash-set"), label: "Lash appointments" },
  { href: hairHref("/services/luxury-pedicure-reset"), label: "Pedicure" },
];

const drawerLinks = [
  ...primaryLinks,
  { href: hairHref("/about"), label: "About" },
  { href: hairHref("/faq"), label: "FAQ" },
  { href: hairHref("/contact"), label: "Contact" },
  { href: hairHref("/account"), label: "Account" },
];

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] lg:hidden">
      <div className="absolute inset-0 bg-[#06070bf2]" onClick={onClose} />
      <div className="absolute inset-0 overflow-y-auto bg-[#090c14]">
        <div className="mx-auto flex min-h-full w-full max-w-md flex-col px-4 pb-8 pt-5">
          <div className="flex items-center justify-between border-b border-[var(--veloura-line)] pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[var(--veloura-accent)]">{siteConfig.name}</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Shop, open your cart, or get directions to the store.</p>
            </div>
            <button
              aria-label="Close navigation"
              className="rounded-full border border-[var(--veloura-line)] bg-[#111521] p-2 text-[var(--veloura-text)]"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#111521] p-4">
              <button
                type="button"
                onClick={() => setProductsOpen((value) => !value)}
                className={`flex w-full items-center justify-between rounded-[16px] px-2 py-2 text-left transition ${
                  productsOpen
                    ? "bg-[rgba(214,195,162,0.14)] text-[var(--veloura-accent)]"
                    : "hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                }`}
              >
                <span className="text-sm uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Products</span>
                <ChevronDown className={`h-4 w-4 text-[var(--veloura-text)] transition ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen ? (
                <div className="mt-3 grid gap-2">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#161c2a] px-4 py-3 text-sm text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#111521] p-4">
              <button
                type="button"
                onClick={() => setServicesOpen((value) => !value)}
                className={`flex w-full items-center justify-between rounded-[16px] px-2 py-2 text-left transition ${
                  servicesOpen
                    ? "bg-[rgba(214,195,162,0.14)] text-[var(--veloura-accent)]"
                    : "hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                }`}
              >
                <span className="text-sm uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Services</span>
                <ChevronDown className={`h-4 w-4 text-[var(--veloura-text)] transition ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen ? (
                <div className="mt-3 grid gap-2">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#161c2a] px-4 py-3 text-sm text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {drawerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#111521] px-4 py-4 text-base text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href={hairHref("/cart")} className="rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[#111521] px-4 py-3 text-sm text-[var(--veloura-text)]" onClick={onClose}>
              Open cart
            </Link>
            <Link href={siteConfig.maps} target="_blank" rel="noreferrer" className="rounded-[18px] border border-[rgba(255,255,255,0.08)] bg-[#111521] px-4 py-3 text-sm text-[var(--veloura-text)]" onClick={onClose}>
              Get directions
            </Link>
          </div>

          <div className="mt-6 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[#111521] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
            <p>{siteConfig.address}</p>
            <p className="mt-2">{siteConfig.phone}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const desktopProductsRef = useRef<HTMLDivElement | null>(null);
  const desktopServicesRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const serviceCloseTimerRef = useRef<number | null>(null);
  const cartCount = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!desktopProductsRef.current?.contains(event.target as Node)) {
        setDesktopProductsOpen(false);
      }
      if (!desktopServicesRef.current?.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setDesktopProductsOpen(false);
    }, 160);
  }

  function clearServiceCloseTimer() {
    if (serviceCloseTimerRef.current) {
      window.clearTimeout(serviceCloseTimerRef.current);
      serviceCloseTimerRef.current = null;
    }
  }

  function scheduleServiceClose() {
    clearServiceCloseTimer();
    serviceCloseTimerRef.current = window.setTimeout(() => {
      setDesktopServicesOpen(false);
    }, 160);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--veloura-line)] bg-[rgba(7,9,14,0.92)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 sm:px-6 lg:flex lg:justify-between lg:gap-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              className="rounded-full border border-[var(--veloura-line)] p-2 text-[var(--veloura-text)] lg:hidden"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href={hairHref()} className="flex min-w-0 items-center gap-3">
              <div className="hidden rounded-full border border-[rgba(214,195,162,0.36)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-[11px] uppercase tracking-[0.42em] text-[var(--veloura-accent)] sm:block">
                Maison
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-xl leading-none text-[var(--veloura-text)] sm:text-2xl">{siteConfig.name}</p>
                <p className="hidden text-[10px] uppercase tracking-[0.32em] text-[var(--veloura-muted)] sm:block">Lagos Hair House</p>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            <div
              ref={desktopProductsRef}
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setDesktopProductsOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setDesktopProductsOpen((value) => !value)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                  desktopProductsOpen
                    ? "bg-[rgba(214,195,162,0.14)] text-[var(--veloura-accent)]"
                    : "text-[var(--veloura-text)] hover:bg-[rgba(214,195,162,0.08)] hover:text-[var(--veloura-accent)] active:scale-[0.98] active:bg-[rgba(214,195,162,0.16)]"
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`h-4 w-4 transition ${desktopProductsOpen ? "rotate-180" : ""}`} />
              </button>

              {desktopProductsOpen ? (
                <div className="absolute left-0 top-full z-30 mt-3 w-64 rounded-[24px] border border-[var(--veloura-line)] bg-[#0c1019] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                  <div className="grid gap-2">
                    {productLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#111521] px-4 py-3 text-sm text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div
              ref={desktopServicesRef}
              className="relative"
              onMouseEnter={() => {
                clearServiceCloseTimer();
                setDesktopServicesOpen(true);
              }}
              onMouseLeave={scheduleServiceClose}
            >
              <button
                type="button"
                onClick={() => setDesktopServicesOpen((value) => !value)}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                  desktopServicesOpen
                    ? "bg-[rgba(214,195,162,0.14)] text-[var(--veloura-accent)]"
                    : "text-[var(--veloura-text)] hover:bg-[rgba(214,195,162,0.08)] hover:text-[var(--veloura-accent)] active:scale-[0.98] active:bg-[rgba(214,195,162,0.16)]"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition ${desktopServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {desktopServicesOpen ? (
                <div className="absolute left-0 top-full z-30 mt-3 w-64 rounded-[24px] border border-[var(--veloura-line)] bg-[#0c1019] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                  <div className="grid gap-2">
                    {serviceLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[#111521] px-4 py-3 text-sm text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.34)] hover:bg-[rgba(214,195,162,0.08)] active:scale-[0.99] active:bg-[rgba(214,195,162,0.16)]">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-[var(--veloura-text)] transition hover:text-[var(--veloura-accent)]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <Link href={hairHref("/search")} className="rounded-full border border-[var(--veloura-line)] p-2 text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.35)]">
              <Search className="h-4 w-4" />
            </Link>
            <Link href={hairHref("/cart")} className="relative rounded-full border border-[var(--veloura-line)] p-2 text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.35)]">
              <ShoppingBag className="h-4 w-4" />
              {cartCount ? <span className="absolute -right-1 -top-1 rounded-full bg-[var(--veloura-accent)] px-1.5 text-[10px] text-[#111319]">{cartCount}</span> : null}
            </Link>
            <Link href={hairHref("/wishlist")} className="relative hidden rounded-full border border-[var(--veloura-line)] p-2 text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.35)] sm:inline-flex">
              <Heart className="h-4 w-4" />
              {wishlistCount ? <span className="absolute -right-1 -top-1 rounded-full bg-[var(--veloura-accent)] px-1.5 text-[10px] text-[#111319]">{wishlistCount}</span> : null}
            </Link>
            <Link href={hairHref("/account")} className="hidden rounded-full border border-[var(--veloura-line)] p-2 text-[var(--veloura-text)] transition hover:border-[rgba(214,195,162,0.35)] sm:inline-flex">
              <User className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu key={open ? "mobile-menu-open" : "mobile-menu-closed"} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
