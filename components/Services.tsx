"use client";

import {
  Clapperboard,
  Music4,
  Tv,
  Building2,
  Plane,
  CalendarDays,
  Sparkles,
  Bot,
  Boxes,
  Package,
  Mic2,
  TrendingUp,
} from "lucide-react";
import { services } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const icons = [
  Clapperboard, Music4, Tv, Building2, Plane, CalendarDays,
  Sparkles, Bot, Boxes, Package, Mic2, TrendingUp,
];

export default function Services() {
  return (
    <section id="services" className="bg-ink py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">01 — What We Do</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl lg:text-6xl">
            Services Built For Impact
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <ScrollReveal key={service.number} delay={(i % 3) * 0.08}>
                <div
                  data-cursor-hover
                  className="group relative h-full overflow-hidden rounded-xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-gold/60"
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-gold/10" />
                  <div className="flex items-start justify-between">
                    <Icon
                      strokeWidth={1.25}
                      className="h-8 w-8 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                    />
                    <span className="font-mono text-xs text-muted">{service.number}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg uppercase leading-tight text-offwhite">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted">{service.description}</p>

                  {/* REAL ASSET SLOT: on hover, could reveal a looping preview clip for this service */}
                  <div className="mt-5 h-0 overflow-hidden transition-all duration-500 group-hover:h-9">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest2 text-gold">
                      Learn more →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
