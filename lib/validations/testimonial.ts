import { z } from "zod";
import { optionalString, orderField, publishStatusField } from "./shared";

export const testimonialSchema = z.object({
  quote: z.string().trim().min(1, "Quote is required."),
  name: z.string().trim().min(1, "Name is required."),
  role: optionalString,
  company: optionalString,
  rating: z.coerce.number().int().min(1).max(5).default(5),
  photoUrl: optionalString,
  order: orderField,
  status: publishStatusField,
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
