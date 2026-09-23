import { getSiteSettings } from "@/lib/repositories/site-settings";
import { getActiveClients } from "@/lib/repositories/clients";
import { clientLogos } from "@/lib/data";

type Logo = { key: string; name: string; src: string | null; height: number; tint: boolean };

const EDGE_FADE = "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)";
const MIN_ITEMS_PER_GROUP = 16;

function LogoGroup({ logos, hidden = false }: { logos: Logo[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {logos.map((logo) => (
        <li key={logo.key} className="flex items-center">
          {logo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={hidden ? "" : logo.name}
              decoding="async"
              style={{ height: logo.height }}
              className={`mx-12 w-auto max-w-[240px] object-contain transition-transform duration-500 hover:scale-110 md:mx-24 ${
                logo.tint ? "brightness-0 invert" : ""
              }`}
            />
          ) : (
            <span className="mx-12 whitespace-nowrap font-luxury text-2xl font-semibold uppercase tracking-[0.32em] text-offwhite transition-colors duration-500 hover:text-gold md:mx-24 md:text-4xl">
              {logo.name}
            </span>
          )}
          <span aria-hidden="true" className="h-2 w-2 shrink-0 rotate-45 bg-gold/70" />
        </li>
      ))}
    </ul>
  );
}

export default async function TrustBar() {
  const [settings, clients] = await Promise.all([getSiteSettings(), getActiveClients()]);

  const text = settings?.trustedByText || "Brands We've Worked With";

  const base: Omit<Logo, "key">[] =
    clients.length > 0
      ? clients.map((c) => ({ name: c.name, src: c.logoUrl, height: 44, tint: true }))
      : clientLogos.map((c) => ({ name: c.name, src: c.logo, height: c.height, tint: false }));

  // Repeat the set so one group is always wider than the screen, keeping the loop seamless.
  const repeat = Math.max(1, Math.ceil(MIN_ITEMS_PER_GROUP / base.length));
  const logos: Logo[] = Array.from({ length: repeat }).flatMap((_, r) =>
    base.map((b, i) => ({ ...b, key: `${i}-${r}` }))
  );

  return (
    <div className="relative z-10 border-y border-line bg-charcoal/40 py-16 md:py-20">
      <p className="px-6 text-center font-mono text-sm uppercase tracking-widest2 text-offwhite md:text-base">
        {text}
      </p>

      <div
        className="trust-marquee mt-12 flex overflow-hidden"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <div className="trust-track">
          <LogoGroup logos={logos} />
          <LogoGroup logos={logos} hidden />
        </div>
      </div>
    </div>
  );
}
