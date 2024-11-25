import { getPaymentDetails } from "@/services/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  //TODO: /api/payment /api/payment/[id] route체크
  const params = req.nextUrl.searchParams;
  const paymentKey = params.get("paymentKey");

  if (!paymentKey) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const response = await getPaymentDetails(paymentKey);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
