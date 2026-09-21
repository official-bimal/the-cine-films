"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/lib/data";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";

type Point = { x: number; y: number };
type Geometry = { width: number; height: number; segments: string[] };

// The roadmap is drawn between the real on-screen positions of the step markers, so it
// stays correct on any screen size: zigzag on desktop, a straight rail on phones.
function buildGeometry(container: HTMLElement, nodes: (HTMLElement | null)[]): Geometry | null {
  const c = container.getBoundingClientRect();
  const points: Point[] = [];
  for (const n of nodes) {
    if (!n) return null;
    const r = n.getBoundingClientRect();
    points.push({ x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 });
  }
  const segments = points.slice(0, -1).map((p, i) => {
    const q = points[i + 1];
    // Drop straight down past the step's text, cross over in the gap before the next step, then
    // land vertically on the next marker.
    const dy = q.y - p.y;
    return `M ${p.x} ${p.y} C ${p.x} ${p.y + dy * 0.9}, ${q.x} ${q.y - dy * 0.1}, ${q.x} ${q.y}`;
  });
  return { width: c.width, height: c.height, segments };
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const segRefs = useRef<(SVGPathElement | null)[]>([]);
  const lengths = useRef<number[]>([]);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(0);

  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);
  const planeRotate = useMotionValue(0);
  const planeOpacity = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const measure = useCallback(() => {
    if (containerRef.current) setGeo(buildGeometry(containerRef.current, nodeRefs.current));
  }, []);

  useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    const ro = new ResizeObserver(measure);
    if (container) ro.observe(container);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const update = useCallback(
    (p: number) => {
      const segs = segRefs.current;
      const lens = lengths.current;
      const total = lens.reduce((a, b) => a + b, 0);
      if (!total) return;

      const dist = Math.min(Math.max(p, 0), 1) * total;
      let done = 0;
      let idx = 0;
      while (idx < lens.length - 1 && dist > done + lens[idx]) {
        done += lens[idx];
        idx += 1;
      }
      const local = Math.min(Math.max(dist - done, 0), lens[idx]);
      const path = segs[idx];
      if (!path) return;

      const at = path.getPointAtLength(local);
      const behind = path.getPointAtLength(Math.max(local - 2, 0));
      const ahead = path.getPointAtLength(Math.min(local + 2, lens[idx]));
      planeX.set(at.x);
      planeY.set(at.y);
      planeRotate.set((Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI);
      planeOpacity.set(1);

      segs.forEach((seg, i) => {
        if (!seg) return;
        const drawn = i < idx ? lens[i] : i === idx ? local : 0;
        seg.style.strokeDashoffset = `${lens[i] - drawn}`;
      });

      const nodesReached = idx + (local >= lens[idx] - 0.5 ? 1 : 0);
      setReached((prev) => (prev === nodesReached ? prev : nodesReached));
    },
    [planeX, planeY, planeRotate, planeOpacity]
  );

  useEffect(() => {
    if (!geo) return;
    lengths.current = segRefs.current
      .slice(0, geo.segments.length)
      .map((seg) => seg?.getTotalLength() ?? 0);
    segRefs.current.forEach((seg, i) => {
      if (seg) seg.style.strokeDasharray = `${lengths.current[i]}`;
    });
    update(progress.get());
  }, [geo, progress, update]);

  useMotionValueEvent(progress, "change", update);

  const last = processSteps.length - 1;

  return (
    <section id="process" className="bg-charcoal/30 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">How We Work</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-offwhite sm:text-5xl">
            From Idea to Obsession
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Here&apos;s how we turn your vision into something people can&apos;t stop talking about.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="relative mt-16 lg:mt-20">
          {geo && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${geo.width} ${geo.height}`}
              fill="none"
            >
              {geo.segments.map((d, i) => (
                <path
                  key={`base-${i}`}
                  d={d}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1.5"
                  strokeDasharray="3 9"
                  strokeLinecap="round"
                />
              ))}
              {geo.segments.map((d, i) => (
                <path
                  key={`gold-${i}`}
                  ref={(el) => {
                    segRefs.current[i] = el;
                  }}
                  d={d}
                  stroke="#D4A853"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 6px rgba(212,168,83,0.55))" }}
                />
              ))}
            </svg>
          )}

          <motion.div
            aria-hidden="true"
            style={{ x: planeX, y: planeY, rotate: planeRotate, opacity: planeOpacity }}
            className="pointer-events-none absolute left-0 top-0 z-20 -ml-7 -mt-7 h-14 w-14"
          >
            <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_0_10px_rgba(212,168,83,0.9)]">
              <g fill="#E8C97A" stroke="#D4A853" strokeWidth="1.2" strokeLinejoin="round">
                <path d="M60 32 C60 30 53 28.5 46 28.5 L14 28.5 C9 28.5 5 30 5 32 C5 34 9 35.5 14 35.5 L46 35.5 C53 35.5 60 34 60 32 Z" />
                <path d="M42 28.5 L21 4 L14 4 L27 28.5 Z" />
                <path d="M42 35.5 L21 60 L14 60 L27 35.5 Z" />
                <path d="M15 28.5 L6 16 L2 16 L7 28.5 Z" />
                <path d="M15 35.5 L6 48 L2 48 L7 35.5 Z" />
              </g>
            </svg>
          </motion.div>

          <ol>
            {processSteps.map((step, i) => {
              const right = i % 2 === 1;
              const on = i <= reached;
              return (
                <li key={step.number} className="relative py-12 lg:py-16">
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className={cn(
                      "absolute top-[46px] z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-500 lg:top-[62px]",
                      right ? "left-0 lg:left-auto lg:right-[5%]" : "left-0 lg:left-[5%]",
                      on ? "border-gold bg-gold shadow-[0_0_18px_rgba(212,168,83,0.7)]" : "border-white/30 bg-ink"
                    )}
                  >
                    {i === last && on && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
                    )}
                  </span>

                  <ScrollReveal
                    className={cn(
                      "pl-12 lg:max-w-md lg:pl-0",
                      right ? "lg:ml-auto lg:mr-[12%] lg:text-right" : "lg:ml-[12%]"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tracking-widest2 transition-colors duration-500",
                        on ? "text-gold" : "text-muted"
                      )}
                    >
                      {step.number}
                    </span>
                    <h3
                      className={cn(
                        "mt-3 font-display text-2xl uppercase leading-tight transition-colors duration-500 sm:text-3xl",
                        on ? "text-offwhite" : "text-offwhite/50"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed transition-colors duration-500 sm:text-base",
                        on ? "text-muted" : "text-muted/60"
                      )}
                    >
                      {step.description}
                    </p>
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
