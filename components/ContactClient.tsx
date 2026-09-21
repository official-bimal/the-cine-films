"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";

// The booking calendar is loaded on demand (see below), so the Cal.com script
// stays out of the initial page bundle.
const CalEmbed = dynamic(() => import("./CalEmbed"), { ssr: false });

// Start loading the calendar this far before the section scrolls into view.
const LOAD_MARGIN = "800px 0px";

export default function ContactClient() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [loadCalendar, setLoadCalendar] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") {
      setLoadCalendar(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoadCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: LOAD_MARGIN }
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      document.body.classList.remove("over-embed");
    };
  }, []);

  return (
    <section id="contact" className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">Let&apos;s Create</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            Good Stories Don&apos;t Sit in a Queue.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            We take on a limited number of projects each month. Grab a slot
            below while one&apos;s open.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-14">
          {/* The calendar is an iframe, so the custom cursor can't follow the pointer
              over it; hide the ring there and let the normal cursor show. */}
          <div
            ref={frameRef}
            onMouseEnter={() => document.body.classList.add("over-embed")}
            onMouseLeave={() => document.body.classList.remove("over-embed")}
            className="min-h-[560px] overflow-hidden rounded-3xl border border-line bg-surface"
          >
            {loadCalendar && <CalEmbed />}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
