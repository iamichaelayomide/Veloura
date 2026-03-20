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

export function ServiceBookingExperience({ service }: { service: Service }) {
  const pushToast = useToastStore((state) => state.pushToast);
  const setBooking = useServiceBookingStore((state) => state.setBooking);
  const [selectedSlotId, setSelectedSlotId] = useState(service.availability.find((slot) => slot.available)?.id ?? "");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "transfer">("paystack");
  const [processing, setProcessing] = useState(false);

  const selectedSlot = useMemo(
    () => service.availability.find((slot) => slot.id === selectedSlotId && slot.available) ?? null,
    [selectedSlotId, service.availability],
  );

  function handleContinue() {
    if (!selectedSlot || !customerName.trim() || !email.trim() || !phone.trim()) {
      pushToast({
        title: "Complete your booking details",
        description: "Choose a time slot and fill in your contact details before payment.",
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

      if (paymentMethod === "paystack") {
        window.location.href = hairHref(`/services/booking/success?${summary.toString()}`);
        return;
      }

      window.location.href = hairHref(`/services/booking/success?${summary.toString()}`);
    }, 700);
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="space-y-6">
        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 1</p>
          <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Choose the day and time that works for you.</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">Your slot is only locked in once payment is completed, so pick the time you actually want before moving forward.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.availability.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => setSelectedSlotId(slot.id)}
                className={`rounded-[22px] border p-4 text-left transition ${
                  selectedSlotId === slot.id
                    ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]"
                    : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"
                } ${!slot.available ? "cursor-not-allowed opacity-40" : ""}`}
              >
                <p className="text-sm text-[var(--veloura-text)]">{slot.dayLabel}</p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">
                  {slot.time} with {slot.stylist}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 2</p>
          <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Add your booking details.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input placeholder="Full name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
            <Input placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <Input placeholder="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="md:col-span-2" />
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional note: preferred finish, event date, existing set removal, or anything the stylist should know."
              className="min-h-[120px] w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-text)] md:col-span-2"
            />
          </div>
        </div>

        <div className="panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Step 3</p>
          <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Pay to confirm the booking.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("paystack")}
              className={`rounded-[22px] border p-4 text-left ${paymentMethod === "paystack" ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"}`}
            >
              <p className="text-sm text-[var(--veloura-text)]">Pay online</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Use the mock online-payment flow to confirm instantly.</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("transfer")}
              className={`rounded-[22px] border p-4 text-left ${paymentMethod === "transfer" ? "border-[rgba(214,195,162,0.4)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"}`}
            >
              <p className="text-sm text-[var(--veloura-text)]">Pay by transfer</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">Review the transfer details and confirm the slot after payment.</p>
            </button>
          </div>

          {paymentMethod === "transfer" ? (
            <div className="mt-5 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p className="text-[var(--veloura-text)]">Transfer details</p>
              <p className="mt-2">Veloura Atelier</p>
              <p>0123456789</p>
              <p>Providus Bank</p>
              <p className="mt-2">Use your full name as the transfer reference so your booking can be matched faster.</p>
            </div>
          ) : (
            <div className="mt-5 rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4 text-sm leading-7 text-[var(--veloura-muted)]">
              <p className="text-[var(--veloura-text)]">Mock online payment</p>
              <p className="mt-2">This flow stays on-site for now, but still behaves like the step that locks the appointment after payment.</p>
            </div>
          )}
        </div>
      </div>

      <div className="panel h-fit rounded-[30px] p-6 lg:sticky lg:top-28">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--veloura-accent)]">Booking summary</p>
        <h3 className="mt-3 font-display text-3xl text-[var(--veloura-text)]">{service.name}</h3>
        <div className="mt-5 space-y-3 text-sm text-[var(--veloura-muted)]">
          <div className="flex justify-between">
            <span>Price</span>
            <span>{formatPrice(service.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration</span>
            <span>{service.durationMinutes} mins</span>
          </div>
          <div className="flex justify-between">
            <span>Slot</span>
            <span>{selectedSlot ? `${selectedSlot.dayLabel}, ${selectedSlot.time}` : "Select a slot"}</span>
          </div>
          <div className="flex justify-between">
            <span>Stylist</span>
            <span>{selectedSlot?.stylist ?? "Pending"}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button onClick={handleContinue} className="w-full" disabled={processing}>
            {processing ? "Confirming booking..." : `Pay ${formatPrice(service.price)} to book`}
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={hairHref("/services")}>View all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
