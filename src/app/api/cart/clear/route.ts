import { authOptions } from "@/app/lib/auth";
import { clearCart } from "@/services/cart";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }

  const { orderId } = await req.json();

  if (!orderId) {
    return new Response("Bad Request", { status: 400 });
  }

  const userId = session.user.id;
  try {
    await clearCart(orderId);
    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
