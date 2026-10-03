import Link from "next/link";
import { ArticleCard, Breadcrumbs, Shell } from "@/components/insights/parts";
import { BASE } from "@/lib/insights/config";
import { categoriesInUse, getArticles } from "@/lib/insights/content";
import { insightsMetadata } from "@/lib/insights/seo";

export async function generateMetadata() {
  return insightsMetadata({
    title: "Insights on Marketing & Video in Nepal | The Cine Films",
    description: "Practical guides on video production, advertising, digital marketing and branding for businesses in Nepal, from The Cine Films.",
    path: BASE,
    noindex: getArticles().length === 0,
  });
}

export default function InsightsIndex() {
  const articles = getArticles();
  const cats = categoriesInUse();
  return (
    <Shell>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: BASE }]} />
      <header className="pb-10 pt-8">
        <p className="section-label">Insights</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-offwhite sm:text-6xl">
          Marketing, advertising and video, explained.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Practical guides from The Cine Films for people planning videos, campaigns and brands in Nepal.
        </p>
        {cats.length > 1 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`${BASE}/${c.slug}`} data-cursor-hover className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-gold hover:text-gold">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
      {articles.length === 0 ? (
        <p className="pb-24 text-muted">Nothing has been published here yet.</p>
      ) : (
        <div className="grid gap-6 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </Shell>
  );
}
