import { z } from "zod";

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const incomingLetterSchema = z.object({
  agendaNumber: z.string().min(1),
  letterNumber: z.string().min(1),
  sender: z.string().min(1),
  subject: z.string().min(1)
});
