"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { filterTabs } from "@/lib/data";
import { toEmbedUrl, youtubeThumbnails } from "@/lib/video";
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

const INITIAL_COUNT = 6;

// Thumbnail priority: our own image > YouTube's thumbnail > a frame of the uploaded video.
function ProjectThumb({ project }: { project: Project }) {
  const yt = project.externalVideoUrl ? youtubeThumbnails(project.externalVideoUrl) : null;
  const [src, setSrc] = useState<string | null>(project.thumbnailUrl ?? yt?.max ?? null);

  const swapToFallback = () => {
    if (yt && src === yt.max) setSrc(yt.fallback);
  };

  const imgClass =
    "absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={swapToFallback}
        onLoad={(e) => e.currentTarget.naturalWidth <= 120 && swapToFallback()}
        className={imgClass}
      />
    );
  }
  if (project.videoUrl) {
    return <video src={`${project.videoUrl}#t=1`} muted playsInline preload="metadata" className={imgClass} />;
  }
  return null;
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const hasVideo = Boolean(project.videoUrl || project.externalVideoUrl);

  const content = (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line placeholder-tile transition-colors duration-500 group-hover:border-gold/50 group-focus-visible:border-gold">
        <ProjectThumb project={project} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-500 group-hover:bg-black/35">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-black/30 text-offwhite backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg uppercase leading-tight text-offwhite transition-colors duration-300 group-hover:text-gold">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-[11px] tracking-widest2 text-muted">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        <span className="text-gold">{project.category}</span>
        {project.client && <span> · {project.client}</span>}
      </p>
    </>
  );

  return hasVideo ? (
    <button data-cursor-hover onClick={onOpen} className="group block w-full text-left outline-none">
      {content}
    </button>
  ) : (
    <div className="group block w-full text-left">{content}</div>
  );
}

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<Project | null>(null);

  useEffect(() => setShowAll(false), [active]);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const embedUrl = lightbox?.externalVideoUrl ? toEmbedUrl(lightbox.externalVideoUrl) : null;

  return (
    <section id="work" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">Our Work</p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none text-offwhite sm:text-5xl">
            See the Work
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            Brands that arrived with a problem and left with a new standard—across marketing, production, drone, and AI.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              data-cursor-hover
              onClick={() => setActive(tab)}
              className={cn(
                "relative pb-2 font-mono text-xs uppercase tracking-widest2 transition-colors",
                active === tab ? "text-offwhite" : "text-muted hover:text-offwhite"
              )}
            >
              {tab}
              {active === tab && (
                <motion.span
                  layoutId="portfolio-tab"
                  className="absolute inset-x-0 -bottom-px h-px bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} onOpen={() => setLightbox(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > INITIAL_COUNT && (
          <ScrollReveal className="mt-16 flex justify-center">
            <MagneticButton
              as="button"
              onClick={() => setShowAll((v) => !v)}
              className="rounded-full border border-white/25 px-8 py-4 font-mono text-xs uppercase tracking-widest2 text-offwhite transition-colors hover:border-gold hover:text-gold"
            >
              {showAll ? "Show Less" : "View More Work"}
            </MagneticButton>
          </ScrollReveal>
        )}
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
                  src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full rounded-lg border border-line"
                />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line placeholder-tile">
                  {lightbox.thumbnailUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={lightbox.thumbnailUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-10 w-10 text-gold" />
                  </div>
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
                  {lightbox.client}
                  {lightbox.year && ` · ${lightbox.year}`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
