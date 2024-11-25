import {
  addProductsToCart,
  deleteCartItem,
  getCartItemsbyUserId,
  updateCartItemQuantity,
} from "@/services/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Bad Request", { status: 400 });
  }
  return getCartItemsbyUserId(userId)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function POST(req: NextRequest) {
  const { newCartItems } = await req.json();
  console.log("newCartItems?", newCartItems);

  if (!newCartItems) {
    return new Response("Bad Request", { status: 400 });
  }

  try {
    const res = await addProductsToCart(newCartItems);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return new Response("Intenal Server Error.", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { itemId, quantity } = await req.json();

  if (!itemId || !quantity) {
    return new Response("Bad Request", { status: 400 });
  }
  return updateCartItemQuantity(itemId, quantity)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("itemId");

  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }
  return deleteCartItem(id)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
