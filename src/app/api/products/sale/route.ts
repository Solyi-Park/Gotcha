import { getSaleProducts } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return getSaleProducts()
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(error.message, { status: 500 }));
}
