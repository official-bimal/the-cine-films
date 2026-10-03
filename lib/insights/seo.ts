import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/repositories/site-settings";
import { SITE_URL, author } from "./config";

export const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`);

interface MetaInput {
  title: string; // full <title>, aim for <= 60 characters
  description: string; // aim for <= 155 characters
  path: string; // canonical path, no trailing slash (matches the rest of the site)
  type?: "website" | "article";
  noindex?: boolean;
  published?: string;
  modified?: string | null;
  image?: string | null;
}

// Pages that define their own openGraph do not inherit the root one, so the
// social image configured in Site Settings is applied here explicitly. If none
// is configured, no image is emitted (same policy as the root layout).
export async function insightsMetadata(m: MetaInput): Promise<Metadata> {
  const settings = await getSiteSettings();
  const img = m.image ?? settings?.ogImageUrl ?? null;
  const images = img ? [{ url: abs(img), width: 1200, height: 630 }] : undefined;
  const url = abs(m.path);
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: url },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "The Cine Films",
      locale: "en_US",
      type: m.type ?? "website",
      ...(m.type === "article" && { publishedTime: m.published, modifiedTime: m.modified ?? undefined, authors: [SITE_URL] }),
      images,
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: images?.map((i) => i.url) },
  };
}

export const orgNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "The Cine Films",
  legalName: "The Cine Films Pvt. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
};

export const breadcrumbNode = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function articleNode(a: {
  title: string; excerpt: string; seoDescription: string | null; date: string; updated: string | null;
  category: string; tags: string[]; words: number; image: string | null; imageAlt: string;
}, path: string) {
  return {
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    headline: a.title,
    description: a.seoDescription ?? a.excerpt,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    mainEntityOfPage: abs(path),
    author: { "@type": "Organization", name: author.name, url: author.url },
    publisher: { "@id": orgNode["@id"] },
    articleSection: a.category,
    ...(a.tags.length > 0 && { keywords: a.tags.join(", ") }),
    wordCount: a.words,
    inLanguage: "en",
    ...(a.image && { image: { "@type": "ImageObject", url: abs(a.image), ...(a.imageAlt && { caption: a.imageAlt }) } }),
  };
}
