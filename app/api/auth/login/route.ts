import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { badRequest, unauthorized } from "@/lib/http";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return badRequest("Input tidak valid");

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email }, include: { role: true } });
  if (!user || !user.isActive) return unauthorized("Akun tidak ditemukan/nonaktif");

  const match = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!match) return unauthorized("Email/password salah");

  const token = await signToken({ id: user.id, role: user.role.name, name: user.name });
  const res = NextResponse.json({ message: "Berhasil login", user: { id: user.id, name: user.name, role: user.role.name } });
  res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 12 });
  if (!parsed.success) return NextResponse.json({ message: "Input tidak valid" }, { status: 400 });

  if (parsed.data.email !== "admin@pa-pasarwajo.go.id" || parsed.data.password !== "Admin123!") {
    return NextResponse.json({ message: "Email/password salah" }, { status: 401 });
  }

  const token = await signToken({ id: "seed-admin", role: "ADMIN", name: "Administrator" });
  const res = NextResponse.json({ message: "Berhasil login (mode demo)" });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email }, include: { role: true } });
  if (!user || !bcrypt.compareSync(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ message: "Email/password salah" }, { status: 401 });
  }
  const token = await signToken({ id: user.id, role: user.role.name, name: user.name });
  const res = NextResponse.json({ message: "Berhasil login" });
  res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
