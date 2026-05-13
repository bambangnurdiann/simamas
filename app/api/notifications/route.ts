import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized("Harus login");
  const data = await prisma.notification.findMany({ where: { userId: session.id }, orderBy: { createdAt: "desc" }, take: 30 });
  return ok(data);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return unauthorized("Harus login");
  const body = await req.json();
  if (!body.userId || !body.title || !body.message) return badRequest("Input tidak valid");
  const created = await prisma.notification.create({ data: { userId: body.userId, title: body.title, message: body.message } });
  return ok(created, 201);
}
import { NextResponse } from "next/server";
export async function GET(){ return NextResponse.json({message:"Endpoint notifikasi siap"}); }
