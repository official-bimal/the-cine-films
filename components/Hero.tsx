import { heroStats as placeholderHeroStats } from "@/lib/data";
import { getSiteSettings } from "@/lib/repositories/site-settings";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const settings = await getSiteSettings();
  const settingsHeroStats = settings?.heroStats as { label: string; value: string }[] | null;
  const heroStats =
    settingsHeroStats && settingsHeroStats.length > 0 ? settingsHeroStats : placeholderHeroStats;

  return (
    <HeroClient
      heroStats={heroStats}
      showreelVideoUrl={settings?.showreelVideoUrl || "/video/cinefilms-showreel.mp4"}
      showreelUrl={settings?.showreelUrl || null}
    />
  );
}
