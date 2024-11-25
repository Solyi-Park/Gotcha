import { getProductById } from "@/services/product";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Params }) {
  const id = context.params.id;

  if (!id) {
    return new Response("Bad Request", { status: 400 });
  }

  console.log("id", id);
  return getProductById(id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(error.message, { status: 500 }));
}
