import { Aperture } from "lucide-react";
import { equipment } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Equipment() {
  return (
    <section className="bg-ink py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">Our Arsenal</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            Cinema-Grade Gear, End-To-End
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {equipment.map((item, i) => (
            <ScrollReveal key={item.name} delay={(i % 4) * 0.06}>
              <div
                data-cursor-hover
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface p-6 text-center transition-colors hover:border-gold/50"
              >
                <Aperture
                  strokeWidth={1.25}
                  className="h-8 w-8 text-muted transition-colors duration-300 group-hover:text-gold"
                />
                <div>
                  <p className="font-display text-sm uppercase text-offwhite">{item.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest2 text-muted">
                    {item.category}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
