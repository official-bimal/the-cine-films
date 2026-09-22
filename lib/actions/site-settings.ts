"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminOrThrow } from "@/lib/auth/guard";
import { upsertSiteSettings } from "@/lib/repositories/site-settings";
import { siteSettingsSchema } from "@/lib/validations/site-settings";
import { resolveMediaUrl } from "@/lib/actions/shared";
import { MediaValidationError } from "@/lib/services/media";

const HERO_STAT_SLOTS = 4;

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdminOrThrow();

  const heroStats = Array.from({ length: HERO_STAT_SLOTS }, (_, i) => ({
    label: String(formData.get(`heroStatLabel${i + 1}`) || "").trim(),
    value: String(formData.get(`heroStatValue${i + 1}`) || "").trim(),
  })).filter((s) => s.label && s.value);

  let logoUrl: string, showreelVideoUrl: string, ogImageUrl: string;
  try {
    logoUrl = await resolveMediaUrl(formData, "logoUrl");
    showreelVideoUrl = await resolveMediaUrl(formData, "showreelVideoUrl");
    ogImageUrl = await resolveMediaUrl(formData, "ogImageUrl");
  } catch (err) {
    if (err instanceof MediaValidationError) {
      redirect(`/admin/site-settings?error=${encodeURIComponent(err.message)}`);
    }
    throw err;
  }

  const parsed = siteSettingsSchema.safeParse({
    logoUrl,
    tagline: formData.get("tagline"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    socialInstagram: formData.get("socialInstagram"),
    socialFacebook: formData.get("socialFacebook"),
    socialYoutube: formData.get("socialYoutube"),
    socialTiktok: formData.get("socialTiktok"),
    showreelVideoUrl,
    showreelUrl: formData.get("showreelUrl"),
    trustedByText: formData.get("trustedByText"),
    heroStats,
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    ogImageUrl,
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Some fields are invalid.";
    redirect(`/admin/site-settings?error=${encodeURIComponent(message)}`);
  }

  await upsertSiteSettings(parsed.data);

  // The public homepage (Nav/Hero/Footer/TrustBar) and layout metadata all
  // read from this singleton, so a settings change needs to invalidate the
  // whole page, not one path.
  revalidatePath("/");
  revalidatePath("/admin/site-settings");

  redirect(`/admin/site-settings?success=${encodeURIComponent("Site settings saved.")}`);
}
