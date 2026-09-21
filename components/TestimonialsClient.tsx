"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
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

const AUTOPLAY_MS = 3500;

const SPRING: Transition = { type: "spring", stiffness: 210, damping: 26, mass: 0.8 };
// A card wrapping from one end of the row to the other snaps into place and
// fades in, instead of flying across the whole stage.
const TELEPORT: Transition = {
  x: { duration: 0 },
  y: { duration: 0 },
  z: { duration: 0 },
  rotateY: { duration: 0 },
  scale: { duration: 0 },
  opacity: { duration: 0.3 },
};

// Three cards with clear gaps on desktop; on smaller screens the focused card
// is centred with its neighbours peeking in from the edges.
type Dims = { w: number; gap: number; sideOpacity: number };

function getDims(vw: number): Dims {
  if (vw >= 1200) return { w: 340, gap: 384, sideOpacity: 1 };
  if (vw >= 960) return { w: 280, gap: 316, sideOpacity: 1 };
  const w = Math.max(240, Math.min(320, vw - 72));
  return { w, gap: Math.round(w * 0.86), sideOpacity: 0.8 };
}

const CARD_H = 460;

function useDims() {
  const [dims, setDims] = useState<Dims>(() => getDims(1280));
  useEffect(() => {
    const update = () => setDims(getDims(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return dims;
}

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("");

const clampRating = (r: number) => Math.max(0, Math.min(5, Math.round(r)));

function TestimonialCard({
  t,
  rel,
  count,
  dims,
  entered,
  stageIn,
  onSelect,
}: {
  t: Testimonial;
  rel: number;
  count: number;
  dims: Dims;
  entered: boolean;
  stageIn: boolean;
  onSelect: () => void;
}) {
  const reduce = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);
  const prevRel = useRef(rel);
  const wrapped = Math.abs(rel - prevRel.current) > count / 2;
  useEffect(() => {
    prevRel.current = rel;
  }, [rel]);

  const abs = Math.abs(rel);
  const active = rel === 0;
  const hidden = abs > 1;
  const rating = clampRating(t.rating);

  const shown = {
    x: rel * dims.gap,
    y: active ? -10 : 0,
    z: -abs * 60,
    rotateY: rel * 14,
    scale: 1 - abs * 0.06,
    opacity: hidden ? 0 : active ? 1 : dims.sideOpacity,
  };
  const stacked = { x: 0, y: 40, z: -120, rotateY: 0, scale: 0.85, opacity: 0 };

  const transition: Transition = reduce
    ? { duration: 0.2 }
    : wrapped
      ? TELEPORT
      : entered
        ? SPRING
        : { ...SPRING, delay: abs * 0.05 };

  return (
    <motion.article
      aria-hidden={!active}
      data-cursor-hover={!active && !hidden ? "" : undefined}
      onClick={onSelect}
      initial={stacked}
      animate={stageIn ? shown : stacked}
      transition={transition}
      className={`absolute top-4 ${active ? "cursor-default" : "cursor-pointer"}`}
      style={{
        left: "50%",
        marginLeft: -dims.w / 2,
        width: dims.w,
        height: CARD_H,
        zIndex: 20 - abs,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <div
        className={`relative flex h-full flex-col rounded-3xl bg-[#FBF7EF] p-4 text-ink ring-2 transition-shadow duration-300 ${
          active
            ? "shadow-[0_30px_70px_-20px_rgba(212,168,83,0.5)] ring-gold"
            : "shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] ring-transparent"
        }`}
      >
        {/* Photo */}
        <div className="relative h-[190px] shrink-0 overflow-hidden rounded-2xl bg-stone-200">
          {t.photoUrl && !photoFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.photoUrl}
              alt={t.name}
              draggable={false}
              onError={() => setPhotoFailed(true)}
              className="h-full w-full object-cover object-[50%_30%]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-display text-5xl text-stone-500">
              {initials(t.name)}
            </div>
          )}
          {t.company && (
            <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {t.company}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-1 flex-col px-1 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={`${active}-${stageIn}-${i}`}
                  initial={active && stageIn && !reduce ? { opacity: 0, scale: 0, rotate: -40 } : false}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 13, delay: 0.25 + i * 0.05 }}
                  className="inline-flex"
                >
                  <Star className={`h-4 w-4 ${i < rating ? "fill-gold text-gold" : "text-stone-300"}`} />
                </motion.span>
              ))}
            </div>
            <Quote aria-hidden className="h-5 w-5 fill-gold/40 text-gold/40" />
          </div>
          <p className="mt-3 line-clamp-6 text-[15px] leading-relaxed text-stone-700">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-auto border-t border-gold/30 pt-4">
            <p className="text-sm font-semibold text-ink">{t.name}</p>
            {t.role && <p className="mt-0.5 text-xs text-[#8C6A22]">{t.role}</p>}
          </div>
        </div>

        {/* Dims the cards that aren't in focus */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl bg-ink"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: active ? 0 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.article>
  );
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panned = useRef(false);
  const reduce = useReducedMotion();
  const dims = useDims();

  const sectionInView = useInView(sectionRef, { amount: 0.3 });
  const stageIn = useInView(stageRef, { once: true, amount: 0.3 });

  const active = count ? index % count : 0;
  const playing = sectionInView && !hovered && !reduce && count > 1;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // One timeout per slide: manual navigation and un-pausing both restart it,
  // which keeps it in sync with the progress bar on the active dot.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active, go]);

  // Once the fly-in has finished, drop the per-card stagger delay.
  useEffect(() => {
    if (!stageIn) return;
    const t = setTimeout(() => setEntered(true), 700);
    return () => clearTimeout(t);
  }, [stageIn]);

  if (!count) return null;

  const half = Math.floor(count / 2);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal/30 py-28"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Two static colour washes: brand blue behind the cards, a faint gold glow below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_52%,rgba(37,99,235,0.2),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_30%_at_50%_100%,rgba(212,168,83,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="text-center">
          <p className="section-label">05 — What Clients Say</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            Trusted By Brands Across Nepal
          </h2>
        </ScrollReveal>

        <motion.div
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            }
          }}
          onPanStart={() => {
            panned.current = false;
          }}
          onPan={(_, info) => {
            if (Math.abs(info.offset.x) > 10) panned.current = true;
          }}
          onPanEnd={(_, info) => {
            const { x, y } = info.offset;
            if (Math.abs(x) > Math.abs(y)) {
              if (x < -60 || info.velocity.x < -500) go(1);
              else if (x > 60 || info.velocity.x > 500) go(-1);
            }
            window.setTimeout(() => {
              panned.current = false;
            }, 50);
          }}
          className="relative mt-14 w-full select-none rounded-3xl outline-none [perspective:1600px] focus-visible:ring-1 focus-visible:ring-gold/40"
          style={{ height: CARD_H + 40, touchAction: "pan-y" }}
        >
          {testimonials.map((t, i) => {
            const rel = ((i - active + count + half) % count) - half;
            return (
              <TestimonialCard
                key={t._id}
                t={t}
                rel={rel}
                count={count}
                dims={dims}
                entered={entered}
                stageIn={stageIn}
                onSelect={() => {
                  if (!panned.current && rel !== 0) setIndex(i);
                }}
              />
            );
          })}
        </motion.div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            data-cursor-hover
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t._id}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === active}
                onClick={() => setIndex(i)}
                className={`relative h-1.5 overflow-hidden rounded-full bg-white/15 transition-all duration-300 ${
                  i === active ? "w-10" : "w-1.5 hover:bg-gold/50"
                }`}
              >
                {i === active &&
                  (playing ? (
                    <motion.span
                      key={`fill-${active}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full bg-gold" />
                  ))}
              </button>
            ))}
          </div>
          <button
            data-cursor-hover
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
