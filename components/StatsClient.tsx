"use client";

import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

type Stat = { label: string; value: number; suffix: string };

export default function StatsClient({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="border-y border-line bg-charcoal/50 py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.05} className="text-center">
              <p className="font-display text-4xl text-gold sm:text-5xl">
                {inView ? (
                  <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-muted">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
