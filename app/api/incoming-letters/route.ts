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
}
