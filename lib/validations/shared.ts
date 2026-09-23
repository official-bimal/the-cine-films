import { z } from "zod";

// HTML forms submit empty optional fields as "" rather than omitting them —
// this turns "" into null so a cleared field (or a removed thumbnail/video)
// actually clears the column. undefined would make Prisma skip the field and
// silently keep the old value on update.
const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

export const optionalString = z.preprocess(emptyToNull, z.string().trim().nullish());

export const optionalUrl = z.preprocess(emptyToNull, z.string().trim().url("Must be a valid URL.").nullish());

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
