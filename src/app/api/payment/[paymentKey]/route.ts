import { getPayment } from "@/services/payment";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Params }) {
  const paymentKey = context.params.paymentKey;

  if (!paymentKey) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const response = await getPayment(paymentKey);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
