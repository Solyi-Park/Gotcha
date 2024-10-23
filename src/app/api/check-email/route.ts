import { checkIfEmailExists } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { email } = await req.json();
  if (!email) {
    return new Response("Bad Request", { status: 400 });
  }

  return checkIfEmailExists(email)
    .then((res) => NextResponse.json(res))
    .catch((error) => error.message);
}
