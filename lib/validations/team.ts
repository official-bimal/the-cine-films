import { z } from "zod";
import { optionalString, optionalUrl, orderField } from "./shared";

export const teamMemberSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  role: optionalString,
  photoUrl: optionalString,
  instagram: optionalUrl,
  order: orderField,
  active: z.coerce.boolean().default(true),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
