import { Plus } from "lucide-react";
import { serviceCategories } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Services() {
  return (
    <section id="services" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal className="text-center">
          <p className="section-label justify-center">What We Do</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-offwhite sm:text-5xl">
            Our Services
          </h2>
        </ScrollReveal>

        <div className="mt-14 flex flex-col gap-4 lg:h-[740px] lg:flex-row lg:gap-3">
          {serviceCategories.map((category, i) => {
            return (
            <ScrollReveal
              key={category.title}
              delay={i * 0.1}
              className="lg:flex-1"
            >
              <article
                tabIndex={0}
                aria-label={category.title}
                data-cursor-hover
                className={`group relative h-[540px] overflow-hidden rounded-2xl border bg-charcoal outline-none transition-colors duration-500 hover:border-gold/60 focus-visible:border-gold sm:h-[520px] lg:h-full ${
                  category.featured ? "border-gold/40" : "border-line"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 group-focus-within:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-700 lg:group-hover:bg-black/45 lg:group-focus-within:bg-black/45" />

                <span
                  className={`absolute left-6 top-6 max-w-[calc(100%-4.5rem)] font-mono text-[10px] uppercase leading-snug tracking-widest2 ${
                    category.featured
                      ? "rounded-full bg-gold px-3 py-1 font-medium text-ink"
                      : "rounded-lg border border-white/20 px-3 py-1 text-offwhite/80 backdrop-blur-sm xl:whitespace-nowrap xl:rounded-full"
                  }`}
                >
                  {category.tag}
                </span>
                <Plus
                  aria-hidden="true"
                  className="absolute right-6 top-6 hidden h-5 w-5 text-offwhite/70 transition-transform duration-500 group-hover:rotate-45 group-hover:text-gold lg:block"
                />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-3xl uppercase leading-none text-offwhite xl:text-4xl">
                    {category.title}
                  </h3>
                  <span className="mt-5 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />

                  {/* Resting: short description. Collapses on hover so the list can take its place. */}
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:grid-rows-[0fr] lg:group-focus-within:grid-rows-[0fr]">
                    <div className="overflow-hidden">
                      <p className="max-w-xs pt-5 text-sm leading-relaxed text-offwhite/70">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover: plain list of service names (always shown on phones). */}
                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="space-y-2.5 pt-5 opacity-100 transition-opacity duration-700 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                        {category.services.map((service) => (
                          <li key={service.name} className="text-sm text-offwhite/80">
                            {service.name}
                            {service.addOn && <span className="ml-2 text-xs text-gold">add-on</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
