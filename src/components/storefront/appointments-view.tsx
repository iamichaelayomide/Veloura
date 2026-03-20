"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useServiceBookingStore } from "@/store/useServiceBookingStore";

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatBookedAt(dateTime: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateTime));
}

function paymentLabel(method: "paystack" | "transfer") {
  return method === "paystack" ? "Paid online" : "Paid by transfer";
}

export function AppointmentsView() {
  const appointments = useServiceBookingStore((state) => state.appointments);

  if (!appointments.length) {
    return (
      <section className="site-shell mt-10">
        <div className="panel rounded-[30px] p-6">
          <p className="text-sm text-[var(--veloura-muted)]">No booked appointments yet.</p>
          <Button asChild className="mt-5">
            <Link href={hairHref("/services")}>Book a service</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="site-shell mt-10 space-y-6">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="panel rounded-[32px] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Booked appointment</p>
              <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)]">{appointment.serviceName}</h2>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Booked {formatBookedAt(appointment.bookedAt)}</p>
            </div>
            <div className="rounded-full border border-[rgba(214,195,162,0.28)] bg-[rgba(214,195,162,0.1)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">
              {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Hairdresser</p>
              <p className="mt-2 text-sm text-[var(--veloura-text)]">{appointment.stylist}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Date</p>
              <p className="mt-2 text-sm text-[var(--veloura-text)]">{formatLongDate(appointment.date)}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Time</p>
              <p className="mt-2 text-sm text-[var(--veloura-text)]">{appointment.time}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Payment</p>
              <p className="mt-2 text-sm text-[var(--veloura-text)]">{paymentLabel(appointment.paymentMethod)}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
            <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Client</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{appointment.customerName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Contact</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{appointment.phone}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Email</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{appointment.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Amount</p>
                  <p className="mt-2 text-sm text-[var(--veloura-text)]">{formatPrice(appointment.servicePrice)}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-[var(--veloura-line)] pt-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Booking note</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-text)]">{appointment.note || "No extra note was added for this appointment."}</p>
              </div>
            </div>

            <div className="flex items-end">
              <Button asChild variant="outline">
                <Link href={hairHref(`/services/${appointment.serviceSlug}?stylist=${appointment.stylistId}#booking-flow`)}>Open service</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
