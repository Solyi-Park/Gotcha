import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { updateAddress } from "@/services/address";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }

  const addressData = await req.json();

  if (!addressData) {
    return new Response("Bad.", { status: 400 });
  }
  const userId = session.user.id;

  try {
    await updateAddress(userId, addressData);
    return NextResponse.json(
      { message: "주소가 성공적으로 변경되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
