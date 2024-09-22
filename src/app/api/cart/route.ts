import { addProductsToCart } from "@/services/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const cartOptions = await req.json();
  console.log("Route: cartOptions", cartOptions);
  if (!cartOptions) {
    return new Response("Bad Request", { status: 400 });
  }

  return addProductsToCart(cartOptions)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
