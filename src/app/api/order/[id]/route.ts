import {
  deleteOrderInfo,
  getOrderDataByOrderId,
  getOrderItemsByOrderId,
} from "@/services/order";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const orderId = context.params.id;

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }
  try {
    const paymentResult = await deleteOrderInfo(orderId);
    return NextResponse.json(paymentResult, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, context: { params: Params }) {
  const orderId = context.params.id;

  const params = req.nextUrl.searchParams;
  const type = params.get("type");

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }
  if (type === "order") {
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
  if (type === "items") {
    try {
      const response = await getOrderItemsByOrderId(orderId);
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { message: error.message || "Server error" },
        { status: 500 }
      );
    }
  }
}
