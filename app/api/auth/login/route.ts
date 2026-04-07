import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // TODO: Add authentication logic here
  console.log({ email, password });

  // For now, just return a dummy token
  return NextResponse.json({ token: "dummy-token" });
}
