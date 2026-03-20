"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminRoutes, siteConfig } from "@/config/site";

const nav = [
  ["/admin", "Overview"],
  ["/admin/products", "Products"],
  ["/admin/orders", "Orders"],
  ["/admin/customers", "Customers"],
  ["/admin/discounts", "Sales"],
  ["/admin/analytics", "Analytics"],
  ["/admin/content", "Content"],
  ["/admin/settings", "Settings"],
] as const;

export function AdminShell({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
  const pathname = usePathname();
  const currentSection = nav.find(([href]) => href === pathname)?.[1] ?? "Overview";

  return (
    <div className="site-shell py-6 sm:py-8 lg:py-10">
      <div className="mb-4 lg:hidden">
        <div className="panel rounded-[26px] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-[var(--veloura-text)] sm:text-3xl">{siteConfig.name} Admin</p>
              <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">Manage products, sales, customers, and orders from one touch-friendly workspace.</p>
            </div>
            <div className="rounded-full border border-[var(--veloura-line)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[var(--veloura-accent)]">
              {currentSection}
            </div>
          </div>
          <div className="mt-4 -mx-4 overflow-x-auto px-4 pb-1 sm:-mx-5 sm:px-5">
            <div className="flex min-w-max gap-2">
              {nav.map(([href, label]) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-full border px-4 py-2.5 text-sm whitespace-nowrap transition ${
                      active
                        ? "border-[rgba(214,195,162,0.45)] bg-[rgba(214,195,162,0.08)] text-[var(--veloura-text)]"
                        : "border-[var(--veloura-line)] text-[var(--veloura-text)] hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[260px,1fr] lg:gap-8">
        <aside className="hidden panel rounded-[30px] p-6 lg:block">
          <p className="font-display text-3xl text-[var(--veloura-text)]">{siteConfig.name} Admin</p>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Manage products, sales, customers, and order activity from one control room.</p>
          <div className="mt-6 space-y-2">
            {nav.map(([href, label]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block rounded-[18px] border px-4 py-3 text-sm transition ${
                    active
                      ? "border-[rgba(214,195,162,0.45)] bg-[rgba(214,195,162,0.08)] text-[var(--veloura-text)]"
                      : "border-[var(--veloura-line)] text-[var(--veloura-text)] hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">{adminRoutes.length} configured admin routes</p>
        </aside>
        <div className="space-y-5 sm:space-y-6">
          <div className="panel rounded-[26px] p-5 sm:rounded-[30px] sm:p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--veloura-accent)]">Admin workspace</p>
            <h1 className="mt-3 font-display text-3xl text-[var(--veloura-text)] sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--veloura-muted)] sm:leading-7">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
