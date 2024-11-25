import {
  addProduct,
  getNewProducts,
  getProductsByCode,
  getProductsByIds,
} from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const newProduct = await req.json();
  if (!newProduct) {
    return new Response("Bad Request", { status: 400 });
  }
  return addProduct(newProduct)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.get("ids");
  if (ids) {
    const productIds = ids.split(",");
    return getProductsByIds(productIds)
      .then((res) => NextResponse.json(res))
      .catch((error) => error.message);
  }

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
