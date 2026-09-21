"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronDown } from "lucide-react";
import { toEmbedUrl } from "@/lib/video";
import MagneticButton from "./MagneticButton";

const HEADLINE = ["WE DON'T", "JUST SHOOT.", "WE CREATE", "CINEMA."];
const SERVICES = ["Commercial Films", "Music Videos", "3D Animation", "AI-Powered Content"];

type HeroStat = { label: string; value: string };

export default function HeroClient({
  heroStats,
  showreelVideoUrl,
  showreelUrl,
}: {
  heroStats: HeroStat[];
  showreelVideoUrl: string | null;
  showreelUrl: string | null;
}) {
  const [reelOpen, setReelOpen] = useState(false);
  const embedUrl = showreelUrl ? toEmbedUrl(showreelUrl) : null;

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-ink py-28 sm:py-0">
      {/*
        REAL ASSET SLOT: this background video comes from the CMS (Site
        Settings -> Showreel Video File, or Showreel Link) at /studio. Until
        one is uploaded, a placeholder gradient shows instead.
      */}
      {showreelVideoUrl ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={showreelVideoUrl} />
          </video>
          {/* Mobile: bottom-heavy fade so centered text stays legible over the video. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/55 lg:hidden" />
          {/* Desktop: gradient sits on the left where the copy lives, keeping the video clear on the right. */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/88 via-black/45 to-transparent lg:block" />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-black/55 via-transparent to-black/25 lg:block" />
        </div>
      ) : (
        <div className="absolute inset-0 placeholder-tile">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-ink to-black" />
          <motion.div
            aria-hidden="true"
            className="absolute -top-1/4 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-gold/10 blur-[140px]"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full bg-electric/10 blur-[140px]"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-vignette" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-6 pt-28 sm:px-10 lg:px-16 lg:pt-[6.5rem] xl:px-24">
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          {/* From lg up, type size and vertical gaps follow viewport height so the whole hero fits in the first view on short laptop screens; the caps match the previous large-monitor sizes. */}
          <h1 className="font-display text-hero-mobile uppercase text-offwhite sm:text-6xl lg:mt-[clamp(0.5rem,2.5vh,2rem)] lg:text-[clamp(2.75rem,9vh,6rem)] lg:leading-[1.08]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 2.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={i === HEADLINE.length - 1 ? "block text-gradient-gold" : "block"}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.7 }}
            className="mx-auto mt-8 max-w-xl lg:mx-0 lg:mt-[clamp(1.25rem,4vh,2.5rem)] lg:max-w-none"
          >
            <p className="font-[family-name:var(--font-premium)] text-lg font-medium leading-snug tracking-[-0.01em] text-offwhite [text-shadow:0_2px_18px_rgba(0,0,0,0.7)] sm:text-xl lg:text-[clamp(1rem,2.8vh,1.5rem)]">
              Premier production house, <span className="italic text-gold-light">made to fit your budget.</span>
            </p>
            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] sm:text-[11px] lg:mt-[clamp(0.5rem,1.6vh,0.875rem)] lg:justify-start">
              {SERVICES.map((service, i) => (
                <Fragment key={service}>
                  {i > 0 && <span aria-hidden="true" className="inline-block h-1 w-1 rotate-45 bg-gold" />}
                  <span>{service}</span>
                </Fragment>
              ))}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-5 lg:mt-[clamp(1.25rem,4vh,2.5rem)] lg:justify-start"
          >
            <MagneticButton
              as="button"
              onClick={() => setReelOpen(true)}
              className="group flex items-center gap-3 rounded-full bg-offwhite px-7 py-4 font-mono text-xs uppercase tracking-widest2 text-ink transition-colors hover:bg-gold"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Our Reel
            </MagneticButton>

            <MagneticButton
              href="#contact"
              className="rounded-full border border-white/25 px-7 py-4 font-mono text-xs uppercase tracking-widest2 text-offwhite transition-colors hover:border-gold hover:text-gold"
            >
              Start Your Project
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.7 }}
            className="mt-16 flex flex-wrap justify-center gap-10 border-t border-line pt-8 sm:mt-20 lg:mt-[clamp(1.5rem,6vh,5rem)] lg:justify-start lg:pt-[clamp(1rem,3vh,2rem)]"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-display text-3xl text-gold sm:text-4xl lg:text-3xl min-[1536px]:text-4xl">{s.value}</p>
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 3.8, duration: 0.6 }, y: { delay: 4, duration: 1.8, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2">Scroll to Explore</span>
        <ChevronDown className="h-4 w-4 text-gold" />
      </motion.div>

      <AnimatePresence>
        {reelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setReelOpen(false)}
          >
            <button
              aria-label="Close reel"
              className="absolute right-6 top-6 text-white/70 hover:text-gold"
              onClick={() => setReelOpen(false)}
              data-cursor-hover
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              {showreelVideoUrl ? (
                <video controls autoPlay className="aspect-video w-full rounded-lg border border-line bg-black">
                  <source src={showreelVideoUrl} />
                </video>
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full rounded-lg border border-line"
                />
              ) : (
                <div className="aspect-video w-full placeholder-tile flex flex-col items-center justify-center gap-3 rounded-lg border border-line">
                  <Play className="h-12 w-12 text-gold" />
                  <p className="font-mono text-xs uppercase tracking-widest2 text-muted">
                    Showreel placeholder — upload one in the content dashboard (/studio)
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
