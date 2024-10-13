import { getProductById } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { pathname } = req.nextUrl;

  const id = pathname.split("/").pop();
  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }

  return getProductById(id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(error.message, { status: 500 }));
}
