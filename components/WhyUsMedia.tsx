import ScrollReveal from "./ScrollReveal";

// Behind-the-scenes photos of the team at work (public/images/team), with their own
// proportions (w x h). To add more: drop a JPG into public/images/team/, add it here, and the
// grid reflows on its own.
const PHOTOS = [
  { src: "/images/team/1.jpg", w: 619, h: 1100 },
  { src: "/images/team/2.jpg", w: 507, h: 1100 },
  { src: "/images/team/3.jpg", w: 825, h: 1100 },
  { src: "/images/team/4.jpg", w: 825, h: 1100 },
  { src: "/images/team/5.jpg", w: 825, h: 1100 },
  { src: "/images/team/6.jpg", w: 825, h: 1100 },
  { src: "/images/team/7.jpg", w: 614, h: 1100 },
  { src: "/images/team/8.jpg", w: 617, h: 1100 },
  { src: "/images/team/9.jpg", w: 643, h: 1100 },
  { src: "/images/team/10.jpg", w: 639, h: 1100 },
  { src: "/images/team/11.jpg", w: 618, h: 1100 },
  { src: "/images/team/12.jpg", w: 654, h: 1100 },
];

// Very tall photos are trimmed slightly (top and bottom) so no tile gets too tall;
// anything wider than this keeps its natural proportions.
const MIN_RATIO = 0.72;

export default function WhyUsMedia() {
  return (
    <div className="mt-10 columns-2 gap-3 sm:columns-3">
      {PHOTOS.map((photo, i) => (
        <ScrollReveal key={photo.src} delay={(i % 4) * 0.06} className="mb-3 break-inside-avoid">
          <div
            className="group relative overflow-hidden rounded-xl border border-line placeholder-tile"
            style={{ aspectRatio: Math.max(photo.w / photo.h, MIN_RATIO) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              width={photo.w}
              height={photo.h}
              alt="The Cine Films team at work"
              loading="lazy"
              style={{ objectPosition: "50% 40%" }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
