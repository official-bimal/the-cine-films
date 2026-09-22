import { getSiteSettings } from "@/lib/repositories/site-settings";
import { updateSiteSettingsAction } from "@/lib/actions/site-settings";
import { btnPrimary, cardPadded, fieldGroup, input, label, pageSubtitle, pageTitle, textarea } from "@/lib/admin-ui";
import Banner from "@/components/admin/Banner";

type HeroStat = { label: string; value: string };

export default async function SiteSettingsPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const settings = await getSiteSettings();
  const heroStats = (settings?.heroStats as HeroStat[] | null) ?? [];

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitle}>Site Settings</h1>
      <p className={pageSubtitle}>
        Global info used across the whole site — logo, contact details, socials, the hero showreel and stats, and SEO
        defaults.
      </p>

      <div className="mt-6">
        <Banner success={searchParams.success} error={searchParams.error} />
      </div>

      <form action={updateSiteSettingsAction} className={cardPadded}>
        <section>
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">Branding</h2>
          <div className={fieldGroup}>
            <label className={label}>Logo</label>
            {settings?.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logoUrl} alt="Current logo" className="mb-2 h-10 w-auto object-contain" />
            )}
            <input type="file" name="logoUrlFile" accept="image/*" className={input} />
            <input type="hidden" name="logoUrlCurrent" value={settings?.logoUrl ?? ""} />
            <p className="mt-1 text-xs text-neutral-400">Leave empty to keep the current logo (falls back to /images/logo.png if none is set).</p>
          </div>
          <div className={fieldGroup}>
            <label className={label} htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" defaultValue={settings?.tagline ?? ""} className={input} />
          </div>
        </section>

        <section className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">Contact Info</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className={fieldGroup}>
              <label className={label} htmlFor="phone">Phone</label>
              <input id="phone" name="phone" defaultValue={settings?.phone ?? ""} className={input} />
            </div>
            <div className={fieldGroup}>
              <label className={label} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" defaultValue={settings?.email ?? ""} className={input} />
            </div>
            <div className={fieldGroup}>
              <label className={label} htmlFor="address">Address</label>
              <input id="address" name="address" defaultValue={settings?.address ?? ""} className={input} />
            </div>
          </div>
        </section>

        <section className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">Social Links</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className={fieldGroup}>
              <label className={label} htmlFor="socialInstagram">Instagram URL</label>
              <input id="socialInstagram" name="socialInstagram" defaultValue={settings?.socialInstagram ?? ""} className={input} />
            </div>
            <div className={fieldGroup}>
              <label className={label} htmlFor="socialFacebook">Facebook URL</label>
              <input id="socialFacebook" name="socialFacebook" defaultValue={settings?.socialFacebook ?? ""} className={input} />
            </div>
            <div className={fieldGroup}>
              <label className={label} htmlFor="socialYoutube">YouTube URL</label>
              <input id="socialYoutube" name="socialYoutube" defaultValue={settings?.socialYoutube ?? ""} className={input} />
            </div>
            <div className={fieldGroup}>
              <label className={label} htmlFor="socialTiktok">TikTok URL</label>
              <input id="socialTiktok" name="socialTiktok" defaultValue={settings?.socialTiktok ?? ""} className={input} />
            </div>
          </div>
        </section>

        <section className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">Hero</h2>
          <div className={fieldGroup}>
            <label className={label}>Showreel Video (background + popup)</label>
            {settings?.showreelVideoUrl && <p className="mb-2 text-xs text-neutral-500">Current: {settings.showreelVideoUrl}</p>}
            <input type="file" name="showreelVideoUrlFile" accept="video/*" className={input} />
            <input type="hidden" name="showreelVideoUrlCurrent" value={settings?.showreelVideoUrl ?? ""} />
            <p className="mt-1 text-xs text-neutral-400">Leave empty to keep the current video (falls back to the bundled showreel if none is set).</p>
          </div>
          <div className={fieldGroup}>
            <label className={label} htmlFor="showreelUrl">Showreel Link (YouTube/Vimeo, optional — used only for the popup)</label>
            <input id="showreelUrl" name="showreelUrl" defaultValue={settings?.showreelUrl ?? ""} className={input} />
          </div>
          <div className={fieldGroup}>
            <label className={label} htmlFor="trustedByText">&quot;Trusted By&quot; bar text</label>
            <input id="trustedByText" name="trustedByText" defaultValue={settings?.trustedByText ?? ""} className={input} placeholder="Brands We've Worked With" />
          </div>

          <label className={label}>Hero Stats (up to 4, shown under the headline)</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const stat = heroStats[i];
              return (
                <div key={i} className="flex gap-2">
                  <input
                    name={`heroStatValue${i + 1}`}
                    placeholder="200+"
                    defaultValue={stat?.value ?? ""}
                    className={input}
                  />
                  <input
                    name={`heroStatLabel${i + 1}`}
                    placeholder="Projects"
                    defaultValue={stat?.label ?? ""}
                    className={input}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">SEO</h2>
          <div className={fieldGroup}>
            <label className={label} htmlFor="seoTitle">Page Title</label>
            <input id="seoTitle" name="seoTitle" defaultValue={settings?.seoTitle ?? ""} className={input} />
          </div>
          <div className={fieldGroup}>
            <label className={label} htmlFor="seoDescription">Meta Description</label>
            <textarea id="seoDescription" name="seoDescription" defaultValue={settings?.seoDescription ?? ""} className={textarea} />
          </div>
          <div className={fieldGroup}>
            <label className={label}>Open Graph / Social Share Image</label>
            {settings?.ogImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.ogImageUrl} alt="Current OG image" className="mb-2 h-20 w-auto rounded object-cover" />
            )}
            <input type="file" name="ogImageUrlFile" accept="image/*" className={input} />
            <input type="hidden" name="ogImageUrlCurrent" value={settings?.ogImageUrl ?? ""} />
            <p className="mt-1 text-xs text-neutral-400">1200×630 recommended. Shown when the site is shared on social media.</p>
          </div>
        </section>

        <button type="submit" className={`${btnPrimary} mt-6`}>
          Save Settings
        </button>
      </form>
    </div>
  );
}
