import { notFound } from "next/navigation";
import { ArticleCard, Breadcrumbs, Shell, SidebarCta } from "@/components/insights/parts";
import { BASE, categoryBySlug } from "@/lib/insights/config";
import { categoriesInUse, getArticles } from "@/lib/insights/content";
import { insightsMetadata } from "@/lib/insights/seo";

// A category page exists only when it contains at least one article (no thin pages).
export const dynamicParams = false;
export const generateStaticParams = () => categoriesInUse().map((c) => ({ category: c.slug }));

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props) {
  const cat = categoryBySlug(params.category);
  if (!cat) return {};
  return insightsMetadata({
    title: `${cat.label} Insights | The Cine Films`,
    description: `${cat.description} Guides from The Cine Films.`,
    path: `${BASE}/${cat.slug}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const cat = categoryBySlug(params.category);
  const articles = getArticles().filter((a) => a.category === params.category);
  if (!cat || articles.length === 0) notFound();
  return (
    <Shell>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: BASE }, { name: cat.label, path: `${BASE}/${cat.slug}` }]} />
      <header className="pb-10 pt-8">
        <p className="section-label">Insights</p>
        <h1 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">{cat.label}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{cat.description}</p>
      </header>
      <div className="grid gap-10 pb-24 lg:grid-cols-[1fr_300px]">
        <div className="grid content-start gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
        {cat.commercial && <div className="lg:sticky lg:top-28 lg:self-start"><SidebarCta /></div>}
      </div>
    </Shell>
  );
}
