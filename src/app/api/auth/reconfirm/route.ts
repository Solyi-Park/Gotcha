// /app/api/auth/reconfirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkUserPassword } from "@/services/user";

export async function POST(req: NextRequest) {
  // TODO: 다른 라우트 핸들러도 업데이트 하기.
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  try {
    const isMatch = await checkUserPassword(email, password);
    if (isMatch) {
      return NextResponse.json(
        { message: "비밀번호가 확인되었습니다." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "비밀번호를 다시 확인해주세요." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
