import { NextRequest, NextResponse } from "next/server";

import { createCheckoutOrder } from "@/lib/checkout";

const PAYSTACK_API = "https://api.paystack.co";

export async function GET(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = request.nextUrl.searchParams.get("reference");

  if (!secretKey) {
    return NextResponse.json({ error: "PAYSTACK_SECRET_KEY is not configured on the deployment." }, { status: 503 });
  }

  if (!reference) {
    return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
  }

  const response = await fetch(`${PAYSTACK_API}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  const payload = await response.json();

  if (!response.ok || !payload.status) {
    return NextResponse.json({ error: payload.message ?? "Unable to verify transaction." }, { status: 400 });
  }

  const transaction = payload.data;
  const orderContext = transaction.metadata?.order_context;

  if (transaction.status !== "success" || !orderContext) {
    return NextResponse.json({ error: "Transaction was not successful." }, { status: 400 });
  }

  try {
    await createCheckoutOrder({
      details: orderContext.details,
      paymentMethod: "paystack",
      paymentStatus: "paid",
      fulfillmentStatus: orderContext.details.fulfillmentMethod === "pickup" ? "ready_for_pickup" : "processing",
      amount: orderContext.amount,
      cartSnapshot: orderContext.cartSnapshot,
      reference,
    });
  } catch {
    return NextResponse.json({ error: "Payment verified, but order persistence failed." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    reference,
    fulfillment: orderContext.details.fulfillmentMethod,
  });
}
