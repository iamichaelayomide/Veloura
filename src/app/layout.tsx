import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";

import { ToastStack } from "@/components/shared/toast-stack";
import { AnnouncementBar } from "@/components/storefront/announcement-bar";
import { SiteFooter } from "@/components/storefront/site-footer";
import { SiteHeader } from "@/components/storefront/site-header";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Veloura | Luxury Hair",
    template: "%s | Veloura",
  },
  description: "Luxury wigs, bundles, frontals, and hair essentials in a dedicated premium storefront.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function HairLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} overflow-x-hidden font-[var(--font-sans)]`}>
        <AnnouncementBar />
        <SiteHeader />
        <main>{children}</main>
        <ToastStack />
        <SiteFooter />
      </body>
    </html>
  );
}

