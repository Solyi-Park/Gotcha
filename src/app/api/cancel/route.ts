import { getCancelData } from "@/services/order";
import { cancelPayment } from "@/services/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paymentKey, cancelReason, cancelAmount } = await req.json();

  if (!paymentKey || !cancelReason) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const cancelRes = await cancelPayment(
      paymentKey,
      cancelReason,
      cancelAmount
    );
    return NextResponse.json(cancelRes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const paymentKey = params.get("paymentKey");

  if (!paymentKey) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const response = await getCancelData(paymentKey);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
