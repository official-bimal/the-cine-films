"use client";

import { Film, Cpu, Layers, MapPin, Clock, DollarSign } from "lucide-react";
import { whyUs } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const icons = [Film, Cpu, Layers, MapPin, Clock, DollarSign];

export default function WhyUs() {
  return (
    <section id="about" className="bg-charcoal/30 py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <ScrollReveal>
          <p className="section-label">04 — Why The Cine Films</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            Your Story Deserves A Cinematic Treatment
          </h2>
          <p className="mt-6 max-w-md text-muted">
            We&apos;re not a run-of-the-mill videography service — we&apos;re storytellers, technologists,
            and Pokhara locals who understand exactly how to turn your brand into something
            people remember.
          </p>

          {/* REAL ASSET SLOT: replace with an actual image/video collage of the team at work */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-lg border border-line placeholder-tile" />
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {whyUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <ScrollReveal key={item.title} delay={(i % 2) * 0.1}>
                <div
                  data-cursor-hover
                  className="h-full rounded-xl border border-line bg-surface p-6 transition-colors hover:border-gold/50"
                >
                  <Icon strokeWidth={1.25} className="h-7 w-7 text-gold" />
                  <h3 className="mt-4 font-display text-base uppercase leading-tight text-offwhite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
