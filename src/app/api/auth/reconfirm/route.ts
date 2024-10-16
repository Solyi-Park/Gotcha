import { getUserById } from "@/services/user";
import { hashPassword, verifyPassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { userId, password } = await req.json();

  if (!userId || !password) {
    return new Response("Bad Request", { status: 400 });
  }

  //   const hashedPassword = await hashPassword(password);
  try {
    const user = await getUserById(userId);

    const hashedPassword = user.password !== null ? user.password : "";
    const isMatch = await verifyPassword(password, hashedPassword);
    if (isMatch) {
      return NextResponse.json("비밀번호가 확인되었습니다.", { status: 200 });
    } else {
      return NextResponse.json("비밀번호를 다시 확인해주세요.", {
        status: 401,
      });
    }
  } catch (error) {
    return NextResponse.json("서버 오류가 발생했습니다.", { status: 500 });
  }
}
