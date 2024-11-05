import { getOrderDataByOrderId, saveOrderInfo } from "@/services/order";
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

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const params = req.nextUrl.searchParams;
  const orderId = params.get("orderId");

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const response = await getOrderDataByOrderId(orderId);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
