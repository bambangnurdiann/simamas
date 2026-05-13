import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Input tidak valid" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email }, include: { role: true } });
  if (!user || !bcrypt.compareSync(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ message: "Email/password salah" }, { status: 401 });
  }
  const token = await signToken({ id: user.id, role: user.role.name, name: user.name });
  const res = NextResponse.json({ message: "Berhasil login" });
  res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
