"use client";

import { useEffect } from "react";
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

function formatPaymentLabel(method: "paystack" | "transfer") {
  return method === "paystack" ? "Paid online" : "Paid by transfer";
}

export function ServiceBookingSuccessView({ method = "paystack" }: { method?: "paystack" | "transfer" }) {
  const booking = useServiceBookingStore((state) => state.booking);
  const confirmBooking = useServiceBookingStore((state) => state.confirmBooking);

  useEffect(() => {
    if (booking.id && booking.status !== "confirmed") {
      confirmBooking();
    }
  }, [booking.id, booking.status, confirmBooking]);

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.12fr_.88fr]">
      <div className="panel rounded-[34px] p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--veloura-accent)]">Appointment booked</p>
            <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)] md:text-5xl">{booking.serviceName || "Booked appointment"}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">
              Your appointment has been booked successfully. Check your SMS and email for the full details, and watch out for the reminder message before your appointment date.
            </p>
          </div>
          <div className="rounded-full border border-[rgba(214,195,162,0.28)] bg-[rgba(214,195,162,0.1)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">
            {method === "paystack" ? "Payment successful" : "Transfer recorded"}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Hairdresser</p>
            <p className="mt-3 text-base text-[var(--veloura-text)]">{booking.stylist || "Not set"}</p>
          </div>
          <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Date</p>
            <p className="mt-3 text-base text-[var(--veloura-text)]">{formatLongDate(booking.date)}</p>
          </div>
          <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Time</p>
            <p className="mt-3 text-base text-[var(--veloura-text)]">{booking.time || "Not set"}</p>
          </div>
          <div className="rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">Amount</p>
            <p className="mt-3 text-base text-[var(--veloura-text)]">{formatPrice(booking.servicePrice)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.88fr]">
          <div className="rounded-[28px] border border-[var(--veloura-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">Client details</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--veloura-muted)]">Client</p>
                <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.customerName || "Not set"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--veloura-muted)]">Phone</p>
                <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.phone || "Not set"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--veloura-muted)]">Email</p>
                <p className="mt-2 text-sm text-[var(--veloura-text)]">{booking.email || "Not set"}</p>
              </div>
            </div>
            <div className="mt-5 border-t border-[var(--veloura-line)] pt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--veloura-muted)]">Booking note</p>
              <p className="mt-2 text-sm leading-7 text-[var(--veloura-text)]">{booking.note || "No extra note was added for this appointment."}</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">What happens next</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-[var(--veloura-text)]">Payment</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">{formatPaymentLabel(booking.paymentMethod)}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--veloura-text)]">SMS and email</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">Your appointment date, time, and hairdresser details will be sent to your phone and email.</p>
              </div>
              <div>
                <p className="text-sm text-[var(--veloura-text)]">Reminder</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">A reminder email will be sent again before your booking date so you do not miss your appointment.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={hairHref("/account/appointments")}>Check booked appointments</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/account")}>Go to account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={hairHref("/contact")}>Contact support</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Saved status</p>
          <div className="mt-4 space-y-4">
            {[
              ["Booked appointment", "Your selected service, date, time, and hairdresser have been saved."],
              ["Notification queued", "The confirmation details should reach SMS and email after booking."],
              ["Reminder pending", "A reminder email should be sent again before the appointment date."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-sm text-[var(--veloura-text)]">{title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
