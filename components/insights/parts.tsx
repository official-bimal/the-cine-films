import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { categoryBySlug } from "@/lib/insights/config";
import { articlePath, formatDate, type Article } from "@/lib/insights/content";
import { abs, breadcrumbNode } from "@/lib/insights/seo";

export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so content can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="pt-8 font-mono text-xs text-muted">
        <ol className="flex flex-wrap gap-2">
          {items.map((it, i) => (
            <li key={it.path} className="flex gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < items.length - 1 ? (
                <Link href={it.path} data-cursor-hover className="hover:text-gold">{it.name}</Link>
              ) : (
                <span aria-current="page" className="text-offwhite/70">{it.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbNode(items.map((i) => ({ name: i.name, path: abs(i.path) }))) }} />
    </>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">{children}</div>;
}

export function ArticleCard({ article }: { article: Article }) {
  const cat = categoryBySlug(article.category);
  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-gold/60">
      <Link href={articlePath(article)} data-cursor-hover className="block h-full">
        {article.image && (
          <Image src={article.image} alt={article.imageAlt} width={900} height={506} className="aspect-video w-full object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        )}
        <div className="p-6">
          <p className="section-label">
            {cat?.label}
            <time dateTime={article.date} className="ml-3 text-muted normal-case tracking-normal">{formatDate(article.date)}</time>
          </p>
          <h3 className="mt-3 font-display text-xl leading-snug text-offwhite transition-colors group-hover:text-gold">{article.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

const SERVICES = ["Video production", "Digital marketing", "Advertising", "Branding", "Photography & drone", "3D & AI production"];

/** End-of-article call to action, with copy specific to the topic. */
export function QuoteCta({ heading }: { heading: string }) {
  return (
    <aside aria-label="Work with The Cine Films" className="my-12 rounded-xl border border-gold/40 bg-gold/5 p-8">
      <p className="section-label">The Cine Films</p>
      <h2 className="mt-3 font-display text-2xl text-offwhite">{heading || "Need creative or marketing support?"}</h2>
      <p className="mt-3 max-w-xl text-muted">
        Tell us what you are planning and we will tell you honestly whether and how we can help. This guide is general and is not a quote.
      </p>
      <Link
        href="/#contact"
        data-cursor-hover
        className="mt-6 inline-block rounded-full border border-gold bg-gold px-7 py-3 font-nav text-[13px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-transparent hover:text-gold"
      >
        Get a Quote
      </Link>
    </aside>
  );
}

export function SidebarCta() {
  return (
    <aside aria-label="Work with The Cine Films" className="rounded-xl border border-gold/40 bg-gold/5 p-6">
      <p className="section-label">The Cine Films</p>
      <h2 className="mt-3 font-display text-xl leading-snug text-offwhite">Need creative &amp; marketing support?</h2>
      <ul className="mt-4 space-y-1 text-sm text-muted">
        {SERVICES.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <Link
        href="/#contact"
        data-cursor-hover
        className="mt-5 inline-block rounded-full border border-gold px-5 py-2 font-nav text-[12px] font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Get a Quote
      </Link>
    </aside>
  );
}
