import ScrollReveal from "./ScrollReveal";

// Behind-the-scenes photos of the team at work, laid out as a mosaic of differently sized tiles.
//
// The frame is fixed: 3 columns x 12 rows, and the box keeps the same proportions at every screen
// size, so the mosaic scales instead of reflowing. Each photo says where it sits (`place`: column
// start/span, row start/span) and which part of it stays in view when it is cropped (`focus`).
//
// To rearrange, or to swap a photo, edit this list; the placements below tile the 3 x 12 grid with
// no gaps:
//   column 1: rows 4-5, 6-8, 9-10, 11-12 (row 1-3 is the wide lead tile, shared with column 2)
//   column 2: rows 4-7, 8-9, 10-12
//   column 3: rows 1-2, 3-5, 6-7, 8-10, 11-12
// Photos come from public/images/team and public/images/cinefilms_photo_grid.
const PHOTOS = [
  // Wide lead tile (columns 1-2, rows 1-3)
  { src: "/images/team/3.jpg", focus: "50% 58%", place: "col-start-1 col-span-2 row-start-1 row-span-3" },

  // Column 3
  { src: "/images/team/6.jpg", focus: "50% 28%", place: "col-start-3 row-start-1 row-span-2" },
  { src: "/images/cinefilms_photo_grid/13.jpeg", focus: "50% 68%", place: "col-start-3 row-start-3 row-span-3" },
  { src: "/images/team/4.jpg", focus: "50% 55%", place: "col-start-3 row-start-6 row-span-2" },
  { src: "/images/team/9.jpg", focus: "50% 52%", place: "col-start-3 row-start-8 row-span-3" },
  { src: "/images/team/12.jpg", focus: "50% 30%", place: "col-start-3 row-start-11 row-span-2" },

  // Column 1 (below the lead tile)
  { src: "/images/team/1.jpg", focus: "62% 45%", place: "col-start-1 row-start-4 row-span-2" },
  { src: "/images/team/7.jpg", focus: "50% 40%", place: "col-start-1 row-start-6 row-span-3" },
  { src: "/images/team/5.jpg", focus: "50% 45%", place: "col-start-1 row-start-9 row-span-2" },
  { src: "/images/team/2.jpg", focus: "50% 45%", place: "col-start-1 row-start-11 row-span-2" },

  // Column 2 (below the lead tile): one tall tile between two shorter ones
  { src: "/images/team/11.jpg", focus: "50% 40%", place: "col-start-2 row-start-4 row-span-4" },
  { src: "/images/team/8.jpg", focus: "50% 45%", place: "col-start-2 row-start-8 row-span-2" },
  { src: "/images/team/10.jpg", focus: "50% 50%", place: "col-start-2 row-start-10 row-span-3" },
];

export default function WhyUsMedia() {
  return (
    <div className="mt-10 grid aspect-[1/2] grid-cols-3 grid-rows-[repeat(12,minmax(0,1fr))] gap-3 sm:aspect-[3/5]">
      {PHOTOS.map((photo, i) => (
        <ScrollReveal key={photo.src} delay={(i % 4) * 0.06} className={photo.place}>
          <div className="group relative h-full overflow-hidden rounded-xl border border-line placeholder-tile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt="The Cine Films team at work"
              loading="lazy"
              style={{ objectPosition: photo.focus }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
