import { getLikedProductsOfUser, updateLikes } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { userId, productId } = await req.json();

  if (!userId || !productId === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  return updateLikes(productId, userId)
    .then((res) => NextResponse.json(res))
    .catch((error) => NextResponse.json(error.message, { status: 500 }));
  //TODO:다른 라우트 핸들러도 에러처리 확인하기
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const userId = params.get("userId");

  if (!userId) {
    return new Response("Bad Request", { status: 400 });
  }
  return getLikedProductsOfUser(userId)
    .then((res) => NextResponse.json(res))
    .catch((error) => NextResponse.json(error.message, { status: 500 }));
}
