import { NextRequest, NextResponse } from "next/server";
import { changePassword, changePhoneNumber } from "@/services/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  //TODO: 사용자 정보 인증하기
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }

  const { newPhoneNumber } = await req.json();

  if (!newPhoneNumber) {
    return new Response("변경할 연락처를 입력해주세요.", { status: 400 });
  }

  const user = {
    email: session.user.email,
    providerId: session.user.providerId,
  };
  try {
    await changePhoneNumber(user, newPhoneNumber);
    return NextResponse.json(
      { message: "연락처가 성공적으로 변경되었습니다." },
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
