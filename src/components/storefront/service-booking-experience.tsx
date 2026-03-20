"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { useServiceBookingStore } from "@/store/useServiceBookingStore";
import { useToastStore } from "@/store/useToastStore";
import type { Service } from "@/types";

function formatCalendarDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(new Date(date));
}

export function ServiceBookingExperience({ service }: { service: Service }) {
  const pushToast = useToastStore((state) => state.pushToast);
  const setBooking = useServiceBookingStore((state) => state.setBooking);
  const [selectedStylistId, setSelectedStylistId] = useState(service.stylists[0]?.id ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "transfer">("paystack");
  const [processing, setProcessing] = useState(false);

  const selectedStylist = useMemo(
    () => service.stylists.find((stylist) => stylist.id === selectedStylistId) ?? null,
    [selectedStylistId, service.stylists],
  );

  const stylistSlots = useMemo(
    () => service.availability.filter((slot) => slot.available && slot.stylistId === selectedStylistId),
    [selectedStylistId, service.availability],
  );

  const availableDates = useMemo(
    () =>
      Array.from(new Map(stylistSlots.map((slot) => [slot.date, slot.dayLabel])).entries()).map(([date, dayLabel]) => ({
        date,
        dayLabel,
      })),
    [stylistSlots],
  );

  const effectiveSelectedDate = availableDates.some((item) => item.date === selectedDate) ? selectedDate : (availableDates[0]?.date ?? "");
  const effectiveDateSlots = stylistSlots.filter((slot) => slot.date === effectiveSelectedDate);
  const effectiveSelectedSlotId = effectiveDateSlots.some((slot) => slot.id === selectedSlotId) ? selectedSlotId : (effectiveDateSlots[0]?.id ?? "");
  const selectedSlot = useMemo(
    () => effectiveDateSlots.find((slot) => slot.id === effectiveSelectedSlotId) ?? null,
    [effectiveDateSlots, effectiveSelectedSlotId],
  );

  function handleContinue() {
    if (!selectedStylist || !selectedSlot || !customerName.trim() || !email.trim() || !phone.trim()) {
      pushToast({
        title: "Complete your booking details",
        description: "Choose your stylist, date, time, and contact details before payment.",
      });
      return;
    }

    setBooking({
      serviceSlug: service.slug,
      serviceName: service.name,
      servicePrice: service.price,
      slotId: selectedSlot.id,
      date: selectedSlot.date,
      dayLabel: selectedSlot.dayLabel,
      time: selectedSlot.time,
      stylist: selectedSlot.stylist,
      customerName,
      email,
      phone,
      note,
      paymentMethod,
    });

    setProcessing(true);
    window.setTimeout(() => {
      const summary = new URLSearchParams({
        method: paymentMethod,
        service: service.name,
        day: selectedSlot.dayLabel,
        time: selectedSlot.time,
        stylist: selectedSlot.stylist,
      });

      window.location.href = hairHref(`/services/booking/success?${summary.toString()}`);
    }, 700);
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.08fr_.92fr]">
      <div className="space-y-6">
        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 1</p>
          <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)] md:text-4xl">Choose your hairdresser.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--veloura-muted)]">Pick the stylist whose finish, reviews, and style direction feel right for you.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {service.stylists.map((stylist) => {
              const isActive = stylist.id === selectedStylistId;
              return (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => {
                    setSelectedStylistId(stylist.id);
                    setSelectedDate("");
                    setSelectedSlotId("");
                  }}
                  className={`rounded-[24px] border p-4 text-left transition ${
                    isActive ? "border-[rgba(214,195,162,0.44)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <p className="text-base text-[var(--veloura-text)]">{stylist.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--veloura-accent)]">{stylist.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--veloura-muted)]">{stylist.bio}</p>
                  <p className="mt-4 text-sm text-[var(--veloura-text)]">
                    {stylist.rating.toFixed(1)} / 5 from {stylist.reviewCount} reviews
                  </p>
                </button>
              );
            })}
          </div>

          {selectedStylist ? (
            <div className="mt-6 rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Why clients book {selectedStylist.name}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--veloura-muted)]">{selectedStylist.specialties.join(" | ")}</p>
                </div>
                <p className="text-sm text-[var(--veloura-text)]">{selectedStylist.rating.toFixed(1)} average</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {selectedStylist.reviews.map((review) => (
                  <div key={review.id} className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(8,11,18,0.55)] p-4">
                    <p className="text-sm leading-6 text-[var(--veloura-text)]">&ldquo;{review.comment}&rdquo;</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--veloura-muted)]">
                      {review.customer} | {review.rating}/5
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 2</p>
          <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)] md:text-4xl">Pick a day from the calendar.</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Choose the month and day that works for you first, then select the exact time.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {availableDates.map((item) => {
              const isActive = item.date === effectiveSelectedDate;
              return (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(item.date);
                    setSelectedSlotId("");
                  }}
                  className={`rounded-[22px] border p-4 text-left transition ${
                    isActive ? "border-[rgba(214,195,162,0.44)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">{new Date(item.date).toLocaleString("en-GB", { month: "short" })}</p>
                  <p className="mt-2 text-lg text-[var(--veloura-text)]">{new Date(item.date).toLocaleString("en-GB", { day: "2-digit" })}</p>
                  <p className="mt-1 text-sm text-[var(--veloura-muted)]">{formatCalendarDate(item.date)}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Available times</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {effectiveDateSlots.map((slot) => {
                const isActive = slot.id === effectiveSelectedSlotId;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`rounded-[22px] border p-4 text-left transition ${
                      isActive ? "border-[rgba(214,195,162,0.44)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <p className="text-sm text-[var(--veloura-text)]">{slot.time}</p>
                    <p className="mt-2 text-sm text-[var(--veloura-muted)]">{slot.dayLabel}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 3</p>
          <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)] md:text-4xl">Add your details.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input placeholder="Full name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
            <Input placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <Input placeholder="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="md:col-span-2" />
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional note: event date, preferred finish, existing style removal, or anything your stylist should know."
              className="min-h-[120px] w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-text)] md:col-span-2"
            />
          </div>
        </div>

        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 4</p>
          <h2 className="mt-3 font-display text-3xl text-[var(--veloura-text)] md:text-4xl">Confirm your appointment.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("paystack")}
              className={`rounded-[22px] border p-4 text-left transition ${paymentMethod === "paystack" ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"}`}
            >
              <p className="text-sm text-[var(--veloura-text)]">Pay online</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Secure your slot right away and move into confirmation instantly.</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("transfer")}
              className={`rounded-[22px] border p-4 text-left transition ${paymentMethod === "transfer" ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"}`}
            >
              <p className="text-sm text-[var(--veloura-text)]">Pay by transfer</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Send payment with your name so the team can match your booking faster.</p>
            </button>
          </div>

          {paymentMethod === "transfer" ? (
            <div className="mt-5 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p className="text-[var(--veloura-text)]">Transfer details</p>
              <p className="mt-2">Veloura Atelier</p>
              <p>0123456789</p>
              <p>Providus Bank</p>
              <p className="mt-2">Use your full name as the transfer reference.</p>
            </div>
          ) : (
            <div className="mt-5 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p className="text-[var(--veloura-text)]">Online payment</p>
              <p className="mt-2">This checkout step is currently a guided on-site confirmation flow.</p>
            </div>
          )}
        </div>
      </div>

      <div className="panel h-fit rounded-[30px] p-6 lg:sticky lg:top-28">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Booking summary</p>
        <h3 className="mt-3 font-display text-3xl text-[var(--veloura-text)]">{service.name}</h3>
        <div className="mt-5 space-y-3 text-sm text-[var(--veloura-muted)]">
          <div className="flex justify-between gap-4">
            <span>Price</span>
            <span>{formatPrice(service.price)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Duration</span>
            <span>{service.durationMinutes} mins</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Hairdresser</span>
            <span>{selectedStylist?.name ?? "Choose one"}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Date</span>
            <span>{effectiveSelectedDate ? formatCalendarDate(effectiveSelectedDate) : "Choose a day"}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Time</span>
            <span>{selectedSlot?.time ?? "Choose a time"}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button onClick={handleContinue} className="w-full" disabled={processing}>
            {processing ? "Confirming booking..." : `Book for ${formatPrice(service.price)}`}
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={hairHref("/services")}>View all appointments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
