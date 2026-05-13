import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { badRequest, ok, unauthorized } from "@/lib/http";
import { z } from "zod";

const dispositionSchema = z.object({
  incomingLetterId: z.string().min(1),
  recipients: z.array(z.string().min(1)).min(1),
  instruction: z.string().min(1),
  note: z.string().optional(),
  deadline: z.string().optional()
});

export async function GET() {
  const data = await prisma.disposition.findMany({
    include: { incomingLetter: true, fromUser: true, recipients: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
    take: 100
  });
  return ok(data);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return unauthorized("Harus login");
  const body = await req.json();
  const parsed = dispositionSchema.safeParse(body);
  if (!parsed.success) return badRequest("Input disposisi tidak valid");

  const created = await prisma.disposition.create({
    data: {
      incomingLetterId: parsed.data.incomingLetterId,
      fromUserId: session.id,
      instruction: parsed.data.instruction,
      note: parsed.data.note,
      deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : null,
      recipients: {
        createMany: {
          data: parsed.data.recipients.map((userId) => ({ userId }))
        }
      }
    },
    include: { recipients: true }
  });

  await prisma.incomingLetter.update({ where: { id: parsed.data.incomingLetterId }, data: { statusDisposisi: "Sudah Didisposisi" } });
  return ok(created, 201);
}
import { NextResponse } from "next/server";
export async function GET(){ return NextResponse.json({message:"Endpoint disposisi siap"}); }
