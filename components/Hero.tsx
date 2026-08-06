import { heroStats as placeholderHeroStats } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import HeroClient from "./HeroClient";

type Settings = {
  heroStats: { label: string; value: string }[] | null;
  showreelUrl: string | null;
  showreelVideoUrl: string | null;
};

export default async function Hero() {
  const settings = await sanityFetch<Settings>(SITE_SETTINGS_QUERY);
  const heroStats =
    settings?.heroStats && settings.heroStats.length > 0
      ? settings.heroStats
      : placeholderHeroStats;

  return (
    <HeroClient
      heroStats={heroStats}
      showreelVideoUrl={settings?.showreelVideoUrl || null}
      showreelUrl={settings?.showreelUrl || null}
    />
  );
}
