import { NextRequest, NextResponse } from "next/server";
import { changeEmail } from "@/services/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }

  const { newEmail } = await req.json();

  if (!newEmail) {
    return new Response("변경할 이메일을 입력해주세요.", { status: 400 });
  }
  const userId = session.user.id;

  try {
    await changeEmail(userId, newEmail);
    return NextResponse.json(
      { message: "이메일이 성공적으로 변경되었습니다." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
