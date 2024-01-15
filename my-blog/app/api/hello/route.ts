import { NextResponse } from "next/server"


export async function GET(request: Request) {
return NextResponse.json({"message":"heloo this is json response"});
  //return new Response('Hello, Next.js!')
}
