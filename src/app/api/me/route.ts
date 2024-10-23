import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  //TODO: 사용자 정보 인증하기
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }
  const user = session?.user;

  try {
    const res = await getUser(user.id);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
