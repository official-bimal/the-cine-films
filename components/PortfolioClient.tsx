"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { filterTabs } from "@/lib/data";
import { toEmbedUrl } from "@/lib/video";
import { cn } from "@/lib/utils";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";

type Project = {
  _id: string;
  title: string;
  category: string;
  client: string | null;
  year: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  externalVideoUrl: string | null;
};

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const embedUrl = lightbox?.externalVideoUrl ? toEmbedUrl(lightbox.externalVideoUrl) : null;

  return (
    <section id="work" className="bg-charcoal/30 py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">02 — Our Work</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl lg:text-6xl">
              Selected Projects
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              data-cursor-hover
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest2 transition-colors",
                active === tab
                  ? "border-gold bg-gold text-ink"
                  : "border-line text-muted hover:border-gold/60 hover:text-offwhite"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  data-cursor-hover
                  onClick={() => setLightbox(project)}
                  className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-line placeholder-tile text-left"
                >
                  {project.thumbnailUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/50">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-gold">
                      {project.category}
                    </span>
                    <h3 className="mt-1 font-display text-base uppercase text-offwhite">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted">{project.client} · {project.year}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ScrollReveal className="mt-14 flex justify-center">
          <MagneticButton
            href="#contact"
            className="rounded-full border border-white/25 px-8 py-4 font-mono text-xs uppercase tracking-widest2 text-offwhite transition-colors hover:border-gold hover:text-gold"
          >
            View All Work
          </MagneticButton>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 text-white/70 hover:text-gold"
              onClick={() => setLightbox(null)}
              data-cursor-hover
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              {lightbox.videoUrl ? (
                <video controls autoPlay className="aspect-video w-full rounded-lg border border-line bg-black">
                  <source src={lightbox.videoUrl} />
                </video>
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full rounded-lg border border-line"
                />
              ) : (
                <div className="aspect-video w-full placeholder-tile flex items-center justify-center rounded-lg border border-line">
                  <Play className="h-10 w-10 text-gold" />
                </div>
              )}
              <div className="mt-5">
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold">
                  {lightbox.category}
                </span>
                <h3 className="mt-1 font-display text-2xl uppercase text-offwhite">
                  {lightbox.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Client: {lightbox.client} · {lightbox.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
