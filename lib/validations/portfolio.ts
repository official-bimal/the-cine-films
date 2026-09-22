import { z } from "zod";
import { optionalString, optionalUrl, orderField, publishStatusField, slugField } from "./shared";

// Matches the 4 categories PortfolioClient.tsx's filterTabs already expect
// (lib/data.ts) — the Phase 1 audit found no evidence more are needed, and
// the brief explicitly says not to invent categories.
export const PROJECT_CATEGORIES = ["Marketing", "Drone", "Production", "AI"] as const;

export const portfolioProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  slug: slugField,
  category: z.enum(PROJECT_CATEGORIES),
  client: optionalString,
  year: optionalString,
  description: optionalString,
  thumbnailUrl: optionalString,
  videoUrl: optionalString,
  externalVideoUrl: optionalUrl,
  order: orderField,
  status: publishStatusField,
});

export type PortfolioProjectInput = z.infer<typeof portfolioProjectSchema>;
