import {
  deleteOrderInfo,
  getOrderDataByOrderId,
  getOrderItemsByOrderId,
} from "@/services/order";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const orderId = req.nextUrl.pathname.split("/").pop();

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

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const orderId = req.nextUrl.pathname.split("/").pop()?.split("?")[0];

  const params = req.nextUrl.searchParams;
  const type = params.get("type");

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }
  if (type === "orders") {
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
