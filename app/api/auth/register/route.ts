import { NextResponse } from "next/server";
import type { UserTp } from "@/app/types/user";
import { db } from "@/app/libs/db/db";
import { users } from "@/drizzel/schema";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const { username, password } = await req.json();
  const hashPass = await bcrypt.hash(password, 10);
  const result = await db
    .insert(users)
    .values({
      username,
      password: hashPass,
    })
    .onConflictDoNothing()
    .returning();

  if (!result[0]) {
    return NextResponse.json({
      message: "Error al registrar el usuario",
    });
  }

  return NextResponse.json({
    message: "Nuevo usuario",
    user: result,
  });
}
