import { addProduct } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const newProduct = await req.json();
  if (!newProduct) {
    return new Response("Bad Request", { status: 400 });
  }
  return addProduct(newProduct)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
