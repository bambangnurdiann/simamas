import { NextResponse } from "next/server";
import { incomingLetterSchema } from "@/lib/validations";

const demoData: Array<Record<string, unknown>> = [];

export async function GET() {
  return NextResponse.json(demoData);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = incomingLetterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Input tidak valid" }, { status: 400 });
  const row = { id: crypto.randomUUID(), ...parsed.data, createdAt: new Date().toISOString() };
  demoData.unshift(row);
  return NextResponse.json(row, { status: 201 });
}
