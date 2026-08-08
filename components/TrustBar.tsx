import { Star } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY, BRANDS_QUERY } from "@/sanity/lib/queries";
import { brands as placeholderBrands, heroStats } from "@/lib/data";

type Settings = { trustedByText: string | null; trustedByRating: number | null };
type Brand = { _id: string; name: string; logoUrl: string | null };

export default async function TrustBar() {
  const [settings, cmsBrands] = await Promise.all([
    sanityFetch<Settings>(SITE_SETTINGS_QUERY),
    sanityFetch<Brand[]>(BRANDS_QUERY),
  ]);

  // Falls back to the "Brands" hero stat count if no custom text is set in
  // the CMS, so this bar never shows up empty.
  const fallbackCount = heroStats.find((s) => s.label === "Brands")?.value ?? "50+";
  const text = settings?.trustedByText || `Trusted by ${fallbackCount} Clients`;
  const rating = settings?.trustedByRating ?? 5;

  const logos: Brand[] =
    cmsBrands && cmsBrands.length > 0
      ? cmsBrands.slice(0, 7)
      : placeholderBrands.slice(0, 7).map((name, i) => ({ _id: `placeholder-${i}`, name, logoUrl: null }));

  return (
    <div className="relative z-10 border-y border-line bg-charcoal/40 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest2 text-offwhite">{text}</p>
          <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < rating ? "h-3.5 w-3.5 fill-gold text-gold" : "h-3.5 w-3.5 text-line"}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {logos.map((brand) =>
            brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={brand._id}
                src={brand.logoUrl}
                alt={brand.name}
                className="h-6 max-w-[110px] object-contain grayscale"
              />
            ) : (
              <span key={brand._id} className="font-display text-sm uppercase tracking-wide text-muted">
                {brand.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
