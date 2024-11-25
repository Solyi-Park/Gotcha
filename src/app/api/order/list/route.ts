import { authOptions } from "@/app/lib/auth";
import { getOrderDataByUserId } from "@/services/order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }
  const user = session.user;

  if (!user.id) {
    return new Response("Bad Request", { status: 400 });
  }

  return getOrderDataByUserId(user.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(error.message, { status: 500 }));
}
