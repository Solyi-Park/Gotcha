import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/services/user";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return new Response("Bad Request", { status: 400 });
  }
  const newUser = { name, email, password };

  return addUser(newUser).then((res) => NextResponse.json(res));
}
