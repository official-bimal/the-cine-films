import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, Breadcrumbs, JsonLd, QuoteCta, Shell, SidebarCta } from "@/components/insights/parts";
import { BASE, author, categoryBySlug } from "@/lib/insights/config";
import { articlePath, formatDate, getArticle, getArticles, relatedArticles } from "@/lib/insights/content";
import { articleNode, graph, insightsMetadata, orgNode } from "@/lib/insights/seo";

export const dynamicParams = false;
export const generateStaticParams = () => getArticles().map((a) => ({ category: a.category, slug: a.slug }));

type Props = { params: { category: string; slug: string } };

export async function generateMetadata({ params }: Props) {
  const a = getArticle(params.category, params.slug);
  if (!a) return {};
  return insightsMetadata({
    title: a.seoTitle ?? `${a.title} | The Cine Films`,
    description: a.seoDescription ?? a.excerpt,
    path: articlePath(a),
    type: "article",
    published: a.date,
    modified: a.updated ?? a.date,
    image: a.image,
  });
}

export default function ArticlePage({ params }: Props) {
  const a = getArticle(params.category, params.slug);
  const cat = categoryBySlug(params.category);
  if (!a || !cat) notFound();
  const path = articlePath(a);
  const related = relatedArticles(a);
  const commercial = cat.commercial && a.cta !== "none";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: BASE },
    { name: cat.label, path: `${BASE}/${cat.slug}` },
    { name: a.title, path },
  ];

  return (
    <Shell>
      <JsonLd data={graph(orgNode, articleNode(a, path))} />
      <Breadcrumbs items={crumbs} />
      <div className="grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 max-w-[760px]">
          <header className="pb-6 pt-8">
            <p className="section-label">
              <Link href={`${BASE}/${cat.slug}`} data-cursor-hover className="hover:text-gold-light">{cat.label}</Link>
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-offwhite sm:text-5xl">{a.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{a.excerpt}</p>
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted">
              <span>By {author.name}</span>
              <time dateTime={a.date}>Published {formatDate(a.date)}</time>
              {a.updated && <time dateTime={a.updated}>Updated {formatDate(a.updated)}</time>}
              <span>{a.readingMinutes} min read</span>
            </p>
          </header>

          {a.image && (
            <Image src={a.image} alt={a.imageAlt} width={1200} height={675} priority sizes="(max-width: 800px) 100vw, 760px" className="mb-8 rounded-xl" />
          )}

          {a.toc.length >= 3 && (
            <nav aria-label="Table of contents" className="mb-10 rounded-xl border border-line bg-surface p-6">
              <p className="section-label">In this article</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted">
                {a.toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} data-cursor-hover className="hover:text-gold">{t.text}</a></li>
                ))}
              </ol>
            </nav>
          )}

          <article className="insights-prose" dangerouslySetInnerHTML={{ __html: a.html }} />

          {a.sources.length > 0 && (
            <section aria-labelledby="sources-heading" className="mt-12 text-sm text-muted">
              <h2 id="sources-heading" className="font-display text-xl text-offwhite">Sources and further reading</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {a.sources.map((s) => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-gold hover:underline">{s.title}</a></li>
                ))}
              </ul>
            </section>
          )}

          {commercial && <QuoteCta heading={cat.cta} />}

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl text-offwhite">Related articles</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {related.map((r) => (
                  <ArticleCard key={r.slug} article={r} />
                ))}
              </div>
            </section>
          )}
        </div>
        {commercial && (
          <div className="hidden lg:block">
            <div className="sticky top-28"><SidebarCta /></div>
          </div>
        )}
      </div>
    </Shell>
  );
}
