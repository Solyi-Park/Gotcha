import {
  cancelOrderItem,
  getOrderDataByOrderId,
  saveOrderInfo,
} from "@/services/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

export async function PUT(req: NextRequest) {
  const { itemId, orderId, cancelQuantity } = await req.json();

  if (!itemId || !orderId || !cancelQuantity) {
    return new Response("Bad Request", { status: 400 });
  }
  console.log("itemId", itemId);
  console.log("orderId", orderId);
  console.log("cancelQuantity", cancelQuantity);
  try {
    const cancelRes = await cancelOrderItem(itemId, orderId, cancelQuantity);
    return NextResponse.json(cancelRes, { status: 200 });
  } catch (error: any) {
    console.error("Error updating order:", error);

    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
