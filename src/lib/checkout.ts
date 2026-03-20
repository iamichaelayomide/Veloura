import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from "@/lib/public-integrations";
import type { CartItemType, CheckoutDetails, FulfillmentMethod, PaymentMethod } from "@/types";

type CheckoutOrderPayload = {
  details: CheckoutDetails;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "failed" | "awaiting_transfer_verification" | "support_requested";
  fulfillmentStatus: "pending" | "processing" | "ready_for_pickup" | "shipped" | "delivered" | "cancelled";
  amount: number;
  cartSnapshot: CartItemType[];
  reference?: string;
  receiptPath?: string;
  receiptStatus?: "not_uploaded" | "uploaded" | "verified";
};

function restHeaders() {
  return {
    apikey: PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export function createOrderNumber() {
  const now = new Date();
  const date = `${now.getFullYear().toString().slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return `VEL-${date}-${suffix}`;
}

export function createPaymentReference(prefix: PaymentMethod = "paystack") {
  return `veloura_${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createCheckoutOrder(payload: CheckoutOrderPayload) {
  const body = {
    order_number: createOrderNumber(),
    reference: payload.reference ?? null,
    customer_name: `${payload.details.firstName} ${payload.details.lastName}`.trim(),
    customer_email: payload.details.email,
    customer_phone: payload.details.phone,
    fulfillment_method: payload.details.fulfillmentMethod,
    payment_method: payload.paymentMethod,
    payment_status: payload.paymentStatus,
    fulfillment_status: payload.fulfillmentStatus,
    amount: payload.amount,
    cart_snapshot: payload.cartSnapshot,
    delivery_details: payload.details,
    receipt_path: payload.receiptPath ?? null,
    receipt_status: payload.receiptStatus ?? "not_uploaded",
  };

  const response = await fetch(`${PUBLIC_SUPABASE_URL}/rest/v1/checkout_orders`, {
    method: "POST",
    headers: restHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Unable to create checkout order.");
  }

  return response.json();
}

export async function uploadReceipt(reference: string, file: File) {
  const path = `${reference}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const response = await fetch(`${PUBLIC_SUPABASE_URL}/storage/v1/object/payment-receipts/${path}`, {
    method: "POST",
    headers: {
      apikey: PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("Unable to upload receipt.");
  }

  return path;
}

export function calculateCheckoutTotal(items: CartItemType[], fulfillmentMethod: FulfillmentMethod) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const normalizedSubtotal = subtotal || 285000;
  const shipping = fulfillmentMethod === "pickup" ? 0 : normalizedSubtotal > 250000 ? 0 : items.length ? 18000 : 12000;

  return {
    subtotal: normalizedSubtotal,
    shipping,
    total: normalizedSubtotal + shipping,
  };
}
