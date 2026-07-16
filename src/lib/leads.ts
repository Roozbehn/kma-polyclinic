import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().optional().or(z.literal("")),
  locale: z.enum(["tr", "en", "fa", "ar"]),
  department: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
  /** Honeypot — bots fill this; humans leave empty. */
  website: z.string().max(200).optional(),
  eventId: z.string().min(8).max(80).optional(),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(200).optional(),
  eventSourceUrl: z.string().url().max(2000).optional(),
});

export function parseLeadBody(body: unknown) {
  return leadSchema.safeParse(body);
}
