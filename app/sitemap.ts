import type { MetadataRoute } from "next";
import { BASE, SITE_URL } from "@/lib/insights/config";
import { articlePath, categoriesInUse, getArticles } from "@/lib/insights/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://thecinefilms.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
  // Insights URLs are listed only when they exist. lastModified is the article's
  // own publish/update date, not the build date.
  if (articles.length > 0) {
    entries.push({ url: `${SITE_URL}${BASE}`, lastModified: articles[0].updated ?? articles[0].date });
    for (const c of categoriesInUse()) {
      const latest = articles.find((a) => a.category === c.slug)!;
      entries.push({ url: `${SITE_URL}${BASE}/${c.slug}`, lastModified: latest.updated ?? latest.date });
    }
    for (const a of articles) {
      entries.push({ url: `${SITE_URL}${articlePath(a)}`, lastModified: a.updated ?? a.date });
    }
  }
  return entries;
}
