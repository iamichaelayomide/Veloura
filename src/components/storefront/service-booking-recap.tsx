"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useServiceBookingStore } from "@/store/useServiceBookingStore";

function formatLongDate(date: string) {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatBookedAt(dateTime: string) {
  if (!dateTime) return "Just booked";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateTime));
}

export function ServiceBookingRecap() {
  const booking = useServiceBookingStore((state) => state.booking);

  if (!booking.serviceSlug) {
    return (
      <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
        <p className="text-sm text-[var(--veloura-muted)]">No saved appointment yet.</p>
        <Button asChild className="mt-4">
          <Link href={hairHref("/services")}>Browse appointments</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Saved appointment</p>
          <h3 className="mt-2 text-2xl text-[var(--veloura-text)]">{booking.serviceName}</h3>
        </div>
        <p className="text-sm text-[var(--veloura-muted)]">Booked {formatBookedAt(booking.bookedAt)}</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Hairdresser</p>
          <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.stylist || "Not selected"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Date</p>
          <p className="mt-2 text-sm text-[var(--veloura-text)]">{formatLongDate(booking.date)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Time</p>
          <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.time || "Not selected"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Client</p>
          <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.customerName || "Not provided"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Contact</p>
          <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.phone || booking.email || "Not provided"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Payment</p>
          <p className="mt-2 text-sm capitalize text-[var(--veloura-text)]">{booking.paymentMethod}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Booking note</p>
          <p className="mt-2 text-sm leading-7 text-[var(--veloura-text)]">{booking.note || "No extra note was added for this appointment."}</p>
        </div>
        <p className="text-sm text-[var(--veloura-text)]">{formatPrice(booking.servicePrice)}</p>
        <Button asChild variant="outline">
          <Link href={hairHref(`/services/${booking.serviceSlug}`)}>Open appointment</Link>
        </Button>
      </div>
    </div>
  );
}
