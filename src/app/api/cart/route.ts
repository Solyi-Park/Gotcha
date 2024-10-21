import {
  addProductsToCart,
  deleteCartItem,
  getCartItemsbyUserId,
  updateCartItemQuantity,
} from "@/services/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Bad Request", { status: 400 });
  }
  return getCartItemsbyUserId(userId)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const newCartItems = await req.json();

  if (!newCartItems) {
    return new Response("Bad Request", { status: 400 });
  }
  return addProductsToCart(newCartItems)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method !== "PUT") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { itemId, quantity } = await req.json();
  console.log("itemId", itemId);
  console.log("quantity", quantity);
  //확인중/////////

  if (!itemId || !quantity) {
    return new Response("Bad Request", { status: 400 });
  }
  return updateCartItemQuantity(itemId, quantity)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function DELETE(req: NextRequest) {
  //여기부터 생각해보기
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("itemId");
  console.log("아이템 id야", id);

  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }
  return deleteCartItem(id)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
