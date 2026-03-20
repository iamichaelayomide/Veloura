import { NextRequest, NextResponse } from "next/server";

import { createPaymentReference } from "@/lib/checkout";

const PAYSTACK_API = "https://api.paystack.co";

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      {
        error: "PAYSTACK_SECRET_KEY is not configured on the deployment.",
      },
      { status: 503 },
    );
  }

  const body = await request.json();
  const reference = createPaymentReference("paystack");
  const origin = request.nextUrl.origin;

  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: body.amount * 100,
      email: body.details.email,
      reference,
      callback_url: `${origin}/checkout/paystack/verify?reference=${reference}&fulfillment=${body.details.fulfillmentMethod}`,
      metadata: {
        cardholder: body.cardholder,
        order_context: {
          details: body.details,
          cartSnapshot: body.cartSnapshot,
          amount: body.amount,
        },
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.status) {
    return NextResponse.json(
      {
        error: payload.message ?? "Unable to initialize Paystack transaction.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(payload.data);
}
