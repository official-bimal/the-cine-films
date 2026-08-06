"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-ink py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">03 — How We Work</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl lg:text-6xl">
            From Concept To Screen
          </h2>
        </ScrollReveal>

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line sm:left-[19px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[15px] top-2 w-px bg-gold sm:left-[19px]"
          />

          <div className="space-y-14">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={0.05 * i}>
                <div className="relative flex gap-6 pl-10 sm:gap-8 sm:pl-12">
                  <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-ink font-mono text-[11px] text-gold sm:h-10 sm:w-10">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase text-offwhite sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm text-muted sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
