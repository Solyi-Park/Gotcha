import { getProductsBySearchKeyword } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const keyword = params.get("keyword");

  if (!keyword) {
    return new Response("Bad Request: Missing 'keyword' parameter", {
      status: 400,
    });
  }

  return getProductsBySearchKeyword(keyword)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
