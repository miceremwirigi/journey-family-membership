import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email, password } = await request.json();

  // TODO: Add user creation logic here
  console.log({ firstName, lastName, email, password });

  // For now, just return a dummy user
  return NextResponse.json({
    user: { firstName, lastName, email },
    token: "dummy-token",
  });
}
