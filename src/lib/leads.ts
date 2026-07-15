import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(40),
  email: z.string().email().optional().or(z.literal("")),
  locale: z.enum(["tr", "en", "fa", "ar"]),
  department: z.string().max(80).optional(),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
});

export function parseLeadBody(body: unknown) {
  return leadSchema.safeParse(body);
}
