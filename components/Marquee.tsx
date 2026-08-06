import { brands as placeholderBrands } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { BRANDS_QUERY } from "@/sanity/lib/queries";
import ScrollReveal from "./ScrollReveal";

type Brand = { _id: string; name: string; logoUrl: string | null };

function Row({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const list = [...brands, ...brands];
  return (
    <div className="flex overflow-hidden">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {list.map((brand, i) => (
          <div
            key={`${brand._id}-${i}`}
            className="mx-4 flex h-16 min-w-[180px] items-center justify-center rounded-md border border-line px-6 grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            {brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoUrl} alt={brand.name} className="max-h-8 max-w-[140px] object-contain" />
            ) : (
              <span className="font-display text-sm uppercase tracking-wide text-offwhite">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Marquee() {
  const cmsBrands = await sanityFetch<Brand[]>(BRANDS_QUERY);
  const brands: Brand[] =
    cmsBrands && cmsBrands.length > 0
      ? cmsBrands
      : placeholderBrands.map((name, i) => ({ _id: `placeholder-${i}`, name, logoUrl: null }));

  return (
    <section className="border-y border-line bg-charcoal/40 py-14">
      <ScrollReveal className="mx-auto mb-8 max-w-7xl px-6 text-center lg:px-10">
        <p className="font-mono text-xs uppercase tracking-widest2 text-gold">
          Brands We&apos;ve Worked With
        </p>
      </ScrollReveal>
      <div className="space-y-4">
        <Row brands={brands} />
        <Row brands={brands} reverse />
      </div>
    </section>
  );
}
