import { db } from "@/app/libs/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.query.users.findMany();
  return NextResponse.json(data);
}
