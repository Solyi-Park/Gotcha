import {
  addProduct,
  getNewProducts,
  getProductsByCode,
} from "@/services/product";
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

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const searchParams = req.nextUrl.searchParams;

  const mediumCode = searchParams.get("categoryMediumCode");
  const smallCode = searchParams.get("categorySmallCode");

  if (!mediumCode && !smallCode) {
    return getNewProducts()
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(error.message, { status: 500 }));
  }

  return getProductsByCode(mediumCode, smallCode)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
