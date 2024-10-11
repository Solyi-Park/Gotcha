import { saveOrderInfo } from "@/services/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { userId, products, amount, shippingCost, shippingDetails } =
    await req.json();
  if (!userId && !products && !amount && !shippingCost && !shippingDetails) {
    return new Response("Bad Request", { status: 400 });
  }
  try {
    const paymentResult = await saveOrderInfo(
      userId,
      products,
      amount,
      shippingCost,
      shippingDetails
    );
    return NextResponse.json(paymentResult, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
