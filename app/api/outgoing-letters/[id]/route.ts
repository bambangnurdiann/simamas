import { prisma } from "@/lib/prisma";
import { outgoingLetterSchema } from "@/lib/validations";
import { badRequest, ok } from "@/lib/http";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.outgoingLetter.findUnique({ where: { id } });
  if (!item) return badRequest("Data tidak ditemukan");
  return ok(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = outgoingLetterSchema.partial().safeParse(body);
  if (!parsed.success) return badRequest("Input tidak valid");
  const updated = await prisma.outgoingLetter.update({ where: { id }, data: parsed.data });
  return ok(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.outgoingLetter.delete({ where: { id } });
  return ok({ message: "Deleted" });
}
