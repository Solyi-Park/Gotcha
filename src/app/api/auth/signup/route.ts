import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/services/user";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return new Response("Bad Request", { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  return addUser(name, email, hashedPassword).then((res) =>
    NextResponse.json(res)
  );
}
