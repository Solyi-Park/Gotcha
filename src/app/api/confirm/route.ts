import { confirmPayment } from "@/services/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { paymentKey, orderId, amount } = await req.json();

  if (!paymentKey && !orderId && !amount) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const paymentResult = await confirmPayment(paymentKey, orderId, amount);
    return NextResponse.json(paymentResult, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
