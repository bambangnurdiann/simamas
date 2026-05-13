import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Input tidak valid" }, { status: 400 });

  if (parsed.data.email !== "admin@pa-pasarwajo.go.id" || parsed.data.password !== "Admin123!") {
    return NextResponse.json({ message: "Email/password salah" }, { status: 401 });
  }

  const token = await signToken({ id: "seed-admin", role: "ADMIN", name: "Administrator" });
  const res = NextResponse.json({ message: "Berhasil login (mode demo)" });
  res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
