import { NextResponse } from "next/server";
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
