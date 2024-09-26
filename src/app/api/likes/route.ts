import { updateLikes } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method !== "PUT") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { productId, userId } = await req.json();

  if (!productId || !userId) {
    return new Response("Bad Request", { status: 400 });
  }
  return updateLikes(productId, userId)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
