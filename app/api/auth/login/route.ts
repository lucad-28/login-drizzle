import { NextResponse } from "next/server";
import type { UserTp } from "@/app/types/user";

const users: UserTp[] = [
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "user",
    password: "user",
  },
  {
    username: "user2",
    password: "user2",
  },
];

export function GET(req: Request) {
  return NextResponse.json({
    message: "Register route",
  });
}

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = users.find((user) => user.username === username);
  if (!user)
    return NextResponse.json(
      {
        message: "USER NOT FOUND",
      },
      { status: 404 }
    );
  if (user.password !== password)
    return NextResponse.json(
      {
        message: "PASSWORD INCORRECT",
      },
      { status: 401 }
    );

  return NextResponse.json(
    {
      token: "+&#&×<×>",
    },
    { status: 200 }
  );
}
