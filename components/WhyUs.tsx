import { whyUs } from "@/lib/data";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";
import WhyUsMedia from "./WhyUsMedia";

export default function WhyUs() {
  return (
    <section id="about" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <ScrollReveal className="lg:col-span-7">
          <p className="section-label">Why The Cine Films</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            We Build Brands Small Agencies Ignore
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            We&apos;re the marketing team that also shoots films. Built for brands with ambition.
          </p>
          <WhyUsMedia />
        </ScrollReveal>

        <div className="lg:col-span-5">
          <ScrollReveal>
            <p className="pb-6 font-mono text-xs uppercase tracking-widest2 text-gold">
              The Cine Films Difference
            </p>
          </ScrollReveal>

          <ol className="border-b border-line">
            {whyUs.map((item, i) => {
              const lead = i === 0;
              return (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <li
                    data-cursor-hover
                    className="group relative grid grid-cols-[2.75rem_1fr] gap-x-2 border-t border-line py-11 sm:grid-cols-[3.5rem_1fr]"
                  >
                    <span className="absolute -top-px left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                    <span className="pt-1.5 font-mono text-xs tracking-widest2 text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "font-display uppercase leading-tight text-offwhite transition-colors duration-500 group-hover:text-gold",
                          lead ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 max-w-xl leading-relaxed",
                          lead ? "text-base text-offwhite/80 sm:text-lg" : "text-sm text-muted sm:text-base"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </li>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
