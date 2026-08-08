"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronDown } from "lucide-react";
import { toEmbedUrl } from "@/lib/video";
import MagneticButton from "./MagneticButton";

const HEADLINE = ["WE DON'T", "JUST SHOOT.", "WE CREATE", "CINEMA."];

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
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      {/*
        REAL ASSET SLOT: this background video comes from the CMS (Site
        Settings -> Showreel Video File, or Showreel Link) at /studio. Until
        one is uploaded, a placeholder gradient shows instead.
      */}
      {showreelVideoUrl ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={showreelVideoUrl} />
          </video>
          {/* Light gradient just for text legibility -- the video itself stays vivid, unlike a heavy dark overlay. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60" />
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

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28 text-center lg:px-10">
        <p className="section-label mb-6 justify-center">Pokhara, Nepal — Est. 2021</p>

        <h1 className="font-display text-hero-mobile uppercase text-offwhite sm:text-6xl lg:text-hero-desktop">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={i === HEADLINE.length - 1 ? "block text-gradient-gold" : "block"}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mx-auto mt-8 max-w-xl font-body text-base text-muted sm:text-lg"
        >
          Pokhara&apos;s Premier Production House — Commercial Films{" "}
          <span className="text-gold">•</span> Music Videos{" "}
          <span className="text-gold">•</span> 3D Animation{" "}
          <span className="text-gold">•</span> AI-Powered Content
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
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
          transition={{ delay: 1.5, duration: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-10 border-t border-line pt-8 sm:mt-24"
        >
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl text-gold sm:text-4xl">{s.value}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2, duration: 1.8, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
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
