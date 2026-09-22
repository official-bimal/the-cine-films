import "server-only";

import { cache } from "react";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { safeQuery } from "./safe";
import type { SiteSettingsInput } from "@/lib/validations/site-settings";

const SINGLETON_ID = "singleton";

// Up to 6 components (layout's generateMetadata + body, Nav, Hero, Footer,
// TrustBar) each read this on a single page render — React's cache() dedupes
// those into one actual database query per request instead of one per caller.
// Every public caller already null-checks the result and falls back to a
// code-level default, so a failed query safely degrades to "not configured".
export const getSiteSettings = cache(async () =>
  safeQuery(() => db.siteSettings.findUnique({ where: { id: SINGLETON_ID } }), null, "getSiteSettings")
);

export async function upsertSiteSettings(data: SiteSettingsInput) {
  const payload = {
    ...data,
    heroStats: data.heroStats as unknown as Prisma.InputJsonValue,
  };
  return db.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...payload },
    update: payload,
  });
}
