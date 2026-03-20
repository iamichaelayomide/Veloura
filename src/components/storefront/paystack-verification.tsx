"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";

export function PaystackVerification({ fulfillment }: { fulfillment?: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const first = window.setTimeout(() => setStep(1), 800);
    const second = window.setTimeout(() => setStep(2), 1700);
    const third = window.setTimeout(() => {
      window.location.href = hairHref(`/order-success?method=paystack&fulfillment=${fulfillment ?? "delivery"}`);
    }, 2600);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
      window.clearTimeout(third);
    };
  }, [fulfillment]);

  const messages = [
    "Reviewing the payment details you entered.",
    "Marking this mock payment as approved.",
    "Preparing your order confirmation and next-step tracking.",
  ];

  return (
    <section className="site-shell mt-10">
      <div className="panel rounded-[30px] p-8">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message}
              className={`rounded-[22px] border p-4 text-sm leading-7 ${
                index <= step
                  ? "border-[rgba(214,195,162,0.38)] bg-[rgba(214,195,162,0.08)] text-[var(--veloura-text)]"
                  : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] text-[var(--veloura-muted)]"
              }`}
            >
              {message}
            </div>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-6">
          <a href={hairHref("/checkout/paystack")}>Back to payment</a>
        </Button>
      </div>
    </section>
  );
}
