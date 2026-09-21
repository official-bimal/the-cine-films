import { proofPoints } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function ProofPoints() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="mb-14 text-center">
          <p className="section-label">The Studio, In Numbers</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {proofPoints.map((p, i) => (
            <ScrollReveal
              key={p.label}
              delay={(i % 3) * 0.08}
              className="group border-b border-r border-line px-4 py-14 text-center md:py-20"
            >
              <p className="font-display text-6xl leading-none text-offwhite transition-colors duration-500 group-hover:text-gold sm:text-7xl lg:text-8xl max-sm:text-5xl">
                {p.value}
              </p>
              <p className="mt-6 font-display text-lg uppercase tracking-wide text-gold sm:text-xl md:text-2xl">
                {p.label}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-muted md:text-xs">
                {p.tagline}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
