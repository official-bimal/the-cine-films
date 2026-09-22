import { z } from "zod";
import { optionalString, orderField } from "./shared";

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  logoUrl: optionalString,
  order: orderField,
  active: z.coerce.boolean().default(true),
});

export type ClientInput = z.infer<typeof clientSchema>;
