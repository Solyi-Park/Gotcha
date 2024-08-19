import { NextApiRequest, NextApiResponse } from "next";

export default function POST(req: NextApiRequest) {
  console.log("req안에 뭐가있니", req);
  return new Response();
}
