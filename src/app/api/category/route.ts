import { findCategoryId } from "@/services/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const searchParams = req.nextUrl.searchParams;

  const largeName = searchParams.get("categoryLargeName");
  const mediumName = searchParams.get("categoryMediumName");
  const smallName = searchParams.get("categorySmallName");

  if (!largeName && !mediumName && !smallName) {
    return new Response("Bad Request", { status: 400 });
  }

  return findCategoryId(largeName, mediumName, smallName)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
