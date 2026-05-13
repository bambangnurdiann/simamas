import { prisma } from "@/lib/prisma";
import { incomingLetterSchema } from "@/lib/validations";
import { badRequest, ok } from "@/lib/http";
import { getSession } from "@/lib/auth";

export async function GET() {
  const data = await prisma.incomingLetter.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return ok(data);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return badRequest("Harus login");
  const body = await req.json();
  const parsed = incomingLetterSchema.safeParse(body);
  if (!parsed.success) return badRequest("Input tidak valid");

  const created = await prisma.incomingLetter.create({
    data: {
      ...parsed.data,
      letterDate: body.letterDate ? new Date(body.letterDate) : new Date(),
      receivedDate: body.receivedDate ? new Date(body.receivedDate) : new Date(),
      createdById: session.id
    }
  });
  return ok(created, 201);
import { NextResponse } from "next/server";
import { incomingLetterSchema } from "@/lib/validations";

const demoData: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json(demoData);
import { prisma } from "@/lib/prisma";
import { incomingLetterSchema } from "@/lib/validations";

export async function GET() {
  const data = await prisma.incomingLetter.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = incomingLetterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Input tidak valid" }, { status: 400 });
  const row = { id: crypto.randomUUID(), ...parsed.data, createdAt: new Date().toISOString() };
  demoData.unshift(row);
  return NextResponse.json(row, { status: 201 });
  const letter = await prisma.incomingLetter.create({
    data: {
      ...parsed.data,
      letterDate: new Date(),
      receivedDate: new Date(),
      classification: "Umum",
      letterNature: "Biasa",
      createdById: body.createdById
    }
  });
  return NextResponse.json(letter, { status: 201 });
}
