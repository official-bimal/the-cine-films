import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { BASE, categories } from "./config";

// Articles are markdown files in /content/insights, so they are reviewed and
// versioned in git like code. Files starting with "_" or with `draft: true`
// are never published. A published file with missing/invalid frontmatter fails
// the build instead of shipping a broken page.

export interface Source {
  title: string;
  url: string;
}
export interface TocItem {
  id: string;
  text: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  updated: string | null;
  category: string;
  tags: string[];
  image: string | null;
  imageAlt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  related: string[];
  sources: Source[];
  cta: "auto" | "none";
  html: string;
  toc: TocItem[];
  words: number;
  readingMinutes: number;
}

const DIR = path.join(process.cwd(), "content", "insights");

const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const day = (v: unknown): string | null => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  const s = str(v);
  return s && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null;
};
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function withToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || "section";
    for (let i = 2; used.has(id); i++) id = `${slugify(text)}-${i}`;
    used.add(id);
    if (level === "2") toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}

let cache: Article[] | null = null;

export function getArticles(): Article[] {
  if (cache) return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_")) : [];
  const articles: Article[] = [];
  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
    if (data.draft === true) continue;
    const where = `content/insights/${file}`;
    for (const key of ["title", "excerpt", "date", "category"]) {
      if (!data[key]) throw new Error(`${where}: missing required frontmatter "${key}"`);
    }
    const category = String(data.category);
    if (!categories.some((c) => c.slug === category)) throw new Error(`${where}: unknown category "${category}"`);
    const date = day(data.date);
    if (!date) throw new Error(`${where}: "date" must be YYYY-MM-DD`);
    const sources: Source[] = Array.isArray(data.sources)
      ? data.sources.map((s: { title?: string; url?: string }) => {
          if (!s?.title || !s?.url) throw new Error(`${where}: each source needs title and url`);
          return { title: String(s.title), url: String(s.url) };
        })
      : [];
    const { html, toc } = withToc(marked.parse(content, { async: false }) as string);
    const words = content.split(/\s+/).filter(Boolean).length;
    articles.push({
      slug: file.replace(/\.md$/, ""),
      title: String(data.title),
      excerpt: String(data.excerpt),
      date,
      updated: day(data.updated),
      category,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      image: str(data.image),
      imageAlt: str(data.imageAlt) ?? "",
      seoTitle: str(data.seoTitle),
      seoDescription: str(data.seoDescription),
      related: Array.isArray(data.related) ? data.related.map(String) : [],
      sources,
      cta: data.cta === "none" ? "none" : "auto",
      html,
      toc,
      words,
      readingMinutes: Math.max(1, Math.round(words / 220)),
    });
  }
  articles.sort((a, b) => b.date.localeCompare(a.date));
  cache = articles;
  return articles;
}

export const hasInsights = () => getArticles().length > 0;
export const getArticle = (category: string, slug: string) =>
  getArticles().find((a) => a.slug === slug && a.category === category);
export const articlePath = (a: Pick<Article, "category" | "slug">) => `${BASE}/${a.category}/${a.slug}`;
export const categoriesInUse = () => categories.filter((c) => getArticles().some((a) => a.category === c.slug));

export function relatedArticles(a: Article, limit = 3): Article[] {
  const all = getArticles().filter((x) => x.slug !== a.slug);
  const picked = a.related.map((s) => all.find((x) => x.slug === s)).filter((x): x is Article => Boolean(x));
  for (const x of all) {
    if (picked.length >= limit) break;
    if (!picked.includes(x) && x.category === a.category) picked.push(x);
  }
  for (const x of all) {
    if (picked.length >= limit) break;
    if (!picked.includes(x)) picked.push(x);
  }
  return picked.slice(0, limit);
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
