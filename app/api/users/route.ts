import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { RoleName } from "@prisma/client";

export async function GET() {
  const session = await getSession();
  if (!session) return unauthorized("Harus login");
  const users = await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: "desc" } });
  return ok(users.map((u) => ({ id: u.id, name: u.name, email: u.email, role: u.role.name, isActive: u.isActive })));
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return unauthorized("Khusus admin");
  const body = await req.json();
  if (!body.name || !body.email || !body.password || !body.role) return badRequest("Input user tidak valid");

  const role = await prisma.role.findUnique({ where: { name: body.role as RoleName } });
  if (!role) return badRequest("Role tidak ditemukan");

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash: await bcrypt.hash(body.password, 10),
      roleId: role.id,
      isActive: true
    }
  });
  return ok({ id: user.id, name: user.name, email: user.email }, 201);
}
import { NextResponse } from "next/server";
export async function GET(){ return NextResponse.json({message:"Endpoint users siap"}); }
