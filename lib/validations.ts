import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const incomingLetterSchema = z.object({
  agendaNumber: z.string().min(1),
  letterNumber: z.string().min(1),
  sender: z.string().min(1),
  subject: z.string().min(1),
  classification: z.string().default("Umum"),
  letterNature: z.string().default("Biasa"),
  attachmentCount: z.number().int().min(0).default(0)
});

export const outgoingLetterSchema = z.object({
  letterNumber: z.string().min(1),
  destination: z.string().min(1),
  subject: z.string().min(1),
  signer: z.string().min(1),
  attachmentInfo: z.string().optional()
});
