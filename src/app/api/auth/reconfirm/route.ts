import { NextRequest, NextResponse } from "next/server";
import { checkUserPassword } from "@/services/user";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response("잘못된 요청입니다.", { status: 400 });
  }

  try {
    const isMatch = await checkUserPassword(email, password);
    if (isMatch) {
      return new Response("비밀번호가 확인되었습니다.", { status: 200 });
    } else {
      return new Response("비밀번호를 다시 확인해주세요.", { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new Response("서버 오류가 발생했습니다.", { status: 500 });
  }
}
