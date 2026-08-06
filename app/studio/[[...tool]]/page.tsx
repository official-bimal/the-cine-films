"use client";

/**
 * This route (/studio) is your content dashboard. Log in here to add
 * portfolio projects, client logos, team members, testimonials, and update
 * site-wide settings like phone/email and the showreel — no code required.
 *
 * It's powered by Sanity Studio, embedded directly into the Next.js app.
 */

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
