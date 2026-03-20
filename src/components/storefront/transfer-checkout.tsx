"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createCheckoutOrder, createPaymentReference, uploadReceipt } from "@/lib/checkout";
import { hairHref } from "@/lib/routes";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useToastStore } from "@/store/useToastStore";

import { useCheckoutPreview } from "./checkout-preview";

export function TransferCheckout({ fulfillment = "delivery" }: { fulfillment?: string }) {
  const router = useRouter();
  const details = useCheckoutStore((state) => state.details);
  const pushToast = useToastStore((state) => state.pushToast);
  const { displayTotal, previewItems } = useCheckoutPreview();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [autoVerification, setAutoVerification] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirmTransfer() {
    try {
      setSubmitting(true);
      const reference = createPaymentReference("transfer");
      const receiptPath = receiptFile ? await uploadReceipt(reference, receiptFile) : undefined;

      await createCheckoutOrder({
        details,
        paymentMethod: "transfer",
        paymentStatus: "awaiting_transfer_verification",
        fulfillmentStatus: fulfillment === "pickup" ? "ready_for_pickup" : "processing",
        amount: displayTotal,
        cartSnapshot: previewItems,
        reference,
        receiptPath,
        receiptStatus: receiptPath ? "uploaded" : "not_uploaded",
      });

      pushToast({
        title: "Transfer order recorded",
        description: "Your order and receipt details have been saved. The support team can now verify the transfer.",
      });

      router.push(
        hairHref(
          `/order-success?method=transfer&fulfillment=${fulfillment}&receipt=${receiptPath ? "uploaded" : "pending"}&verification=${autoVerification ? "auto" : "manual"}`,
        ),
      );
    } catch {
      pushToast({
        title: "Transfer confirmation failed",
        description: "We couldn't save your transfer details. Please retry or continue through WhatsApp support.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="site-shell mt-10 grid gap-8 lg:grid-cols-[1fr_.85fr]">
      <div className="panel rounded-[30px] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--veloura-accent)]">Transfer flow</p>
        <h2 className="mt-3 font-display text-4xl text-[var(--veloura-text)]">Pay by transfer, then confirm the receipt.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["Bank", "Zenith Bank"],
            ["Account name", "Veloura Beauty House Ltd"],
            ["Account number", "1029384756"],
            ["Amount", `NGN ${displayTotal.toLocaleString("en-NG")}`],
          ].map(([label, value]) => (
            <div key={label} className="panel-soft rounded-[22px] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">{label}</p>
              <p className="mt-2 text-base text-[var(--veloura-text)]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-5 text-sm leading-7 text-[var(--veloura-muted)]">
          {fulfillment === "pickup"
            ? "Pickup selected: after payment verification, the team sends your collection window and showroom directions."
            : "Delivery selected: after payment verification, the team confirms dispatch timing and delivery updates."}
        </div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm text-[var(--veloura-text)]">
            Upload transfer receipt
            <input
              type="file"
              className="mt-3 block w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-muted)]"
              onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <label className="flex items-center gap-3 rounded-[18px] border border-[var(--veloura-line)] px-4 py-3 text-sm text-[var(--veloura-muted)]">
            <input type="checkbox" checked={autoVerification} onChange={() => setAutoVerification((value) => !value)} />
            Request automatic verification and keep the order pending while support confirms payment.
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleConfirmTransfer} disabled={submitting}>
            {submitting ? "Saving transfer..." : "Confirm transfer flow"}
          </Button>
          <Button asChild variant="outline">
            <a href={hairHref("/checkout")}>Back to checkout</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
