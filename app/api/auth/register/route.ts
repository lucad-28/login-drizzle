import { NextResponse } from "next/server";
import type { UserTp } from "@/app/types/user";
import { db } from "@/app/libs/db/db";
import { users } from "@/drizzel/schema";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log("username and password");
  console.log(username, password);

  const result = await db
    .insert(users)
    .values({
      username,
      password,
    })
    .returning()
    .onConflictDoNothing();

  if (!result) {
    return NextResponse.json({
      message: "Error al registrar el usuario",
    });
  }

  return NextResponse.json({
    message: "Nuevo usuario",
    user: result,
  });
}
