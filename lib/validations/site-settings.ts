import { z } from "zod";
import { optionalString, optionalUrl } from "./shared";

export const heroStatSchema = z.object({
  label: z.string().trim().min(1, "Label is required."),
  value: z.string().trim().min(1, "Value is required."),
});

export const siteSettingsSchema = z.object({
  logoUrl: optionalString,
  tagline: optionalString,
  phone: optionalString,
  email: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().email("Must be a valid email.").optional()
  ),
  address: optionalString,
  socialInstagram: optionalUrl,
  socialFacebook: optionalUrl,
  socialYoutube: optionalUrl,
  socialTiktok: optionalUrl,
  showreelVideoUrl: optionalString,
  showreelUrl: optionalUrl,
  trustedByText: optionalString,
  heroStats: z.array(heroStatSchema).max(6).default([]),
  seoTitle: optionalString,
  seoDescription: optionalString,
  ogImageUrl: optionalString,
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
