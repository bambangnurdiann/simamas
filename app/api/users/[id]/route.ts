import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return unauthorized("Khusus admin");
  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = body.name;
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (typeof body.roleId === "string") data.roleId = body.roleId;
  if (typeof body.password === "string" && body.password.length >= 6) data.passwordHash = await bcrypt.hash(body.password, 10);
  if (Object.keys(data).length === 0) return badRequest("Tidak ada data yang diubah");

  const updated = await prisma.user.update({ where: { id }, data });
  return ok({ id: updated.id, name: updated.name, isActive: updated.isActive });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return unauthorized("Khusus admin");
  const { id } = await params;
  await prisma.user.delete({ where: { id } });
  return ok({ message: "User dihapus" });
}
