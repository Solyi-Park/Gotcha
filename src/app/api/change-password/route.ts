import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "@/services/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  //TODO: 사용자 정보 인증하기
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  console.log("userId", userId);

  const { newPassword } = await req.json();

  if (!newPassword) {
    return NextResponse.json(
      { message: "새 비밀번호를 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    await changePassword(userId, newPassword);
    return NextResponse.json(
      { message: "비밀번호가 성공적으로 변경되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
