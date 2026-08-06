"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  photoUrl: string | null;
};

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused, testimonials.length]);

  const current = testimonials[index];
  if (!current) return null;

  return (
    <section
      className="bg-charcoal/30 py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <ScrollReveal>
          <p className="section-label">05 — What Clients Say</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            Trusted By Brands Across Nepal
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 min-h-[260px]">
          <Quote className="mx-auto h-8 w-8 text-gold/50" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <p className="mx-auto max-w-2xl font-display text-xl leading-snug text-offwhite sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-6 flex justify-center gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="mt-4">
                {current.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.photoUrl}
                    alt={current.name}
                    className="mx-auto h-12 w-12 rounded-full border border-gold/40 object-cover"
                  />
                ) : (
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-surface font-display text-sm text-gold">
                    {current.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
                <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-offwhite">
                  {current.name}
                </p>
                <p className="font-mono text-[11px] text-muted">
                  {current.role}{current.role && current.company ? ", " : ""}{current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            data-cursor-hover
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
          <button
            data-cursor-hover
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
