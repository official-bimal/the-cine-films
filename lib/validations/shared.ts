import { z } from "zod";

// HTML forms submit empty optional fields as "" rather than omitting them —
// this turns "" into undefined so `.optional()` actually applies, instead of
// every optional field needing its own `.or(z.literal(""))` escape hatch.
export const optionalString = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().optional()
);

export const optionalUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().url("Must be a valid URL.").optional()
);

export const slugField = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only.");

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const orderField = z.coerce.number().int().default(0);
export const publishStatusField = z.enum(["DRAFT", "PUBLISHED"]);
