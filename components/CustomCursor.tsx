"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // globals.css hides the OS cursor site-wide (body { cursor: none }) so
    // this component can draw the custom cursor instead. On /admin we
    // need the real OS cursor back for the dashboard's own UI.
    document.body.classList.toggle("admin-active", Boolean(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    // The admin dashboard needs the real OS cursor for its own UI.
    if (isAdmin) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // How tightly the aura chases the dot: 1 = glued to it, lower = softer trail.
    const follow = reduceMotion ? 1 : 0.35;
    // The aura never trails more than this many px behind the dot, however fast
    // the pointer moves, so it always reads as attached to the cursor.
    const maxLag = 22;

    let targetX = 0;
    let targetY = 0;
    let auraX = 0;
    let auraY = 0;
    let raf = 0;
    let seen = false;

    // The aura's lag behind the dot is a free speed meter: it grows while the
    // pointer moves and shrinks to zero once it stops. That drives the glow.
    function tick() {
      auraX += (targetX - auraX) * follow;
      auraY += (targetY - auraY) * follow;

      let lag = Math.hypot(targetX - auraX, targetY - auraY);
      if (lag > maxLag) {
        const k = maxLag / lag;
        auraX = targetX - (targetX - auraX) * k;
        auraY = targetY - (targetY - auraY) * k;
        lag = maxLag;
      }

      const energy = reduceMotion ? 0 : Math.min(lag / (maxLag * 0.8), 1);
      const aura = auraRef.current;
      if (aura) {
        // `translate` (not `transform`) so the CSS `scale` on the aura pivots on its
        // own centre instead of also scaling this offset. See .cursor-aura.
        aura.style.translate = `${auraX}px ${auraY}px`;
        aura.style.setProperty("--energy", energy.toFixed(3));
      }

      // Sleep once the aura has caught up, so an idle page costs nothing.
      raf = lag < 0.1 ? 0 : requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      if (!seen) {
        // Start the aura under the pointer instead of sweeping in from (0, 0).
        seen = true;
        auraX = targetX;
        auraY = targetY;
        dotRef.current?.classList.add("cursor-ready");
        auraRef.current?.classList.add("cursor-ready");
      }

      if (!raf) raf = requestAnimationFrame(tick);
    }

    function onOver(e: MouseEvent) {
      // Anything marked [data-cursor-hover] (links, buttons, cards) swaps the dot
      // for a pointer arrow.
      const pointer = (e.target as HTMLElement | null)?.closest?.("[data-cursor-hover]") != null;
      dotRef.current?.classList.toggle("is-pointing", pointer);
      auraRef.current?.classList.toggle("is-pointing", pointer);
    }

    function onLeave() {
      dotRef.current?.classList.remove("cursor-ready");
      auraRef.current?.classList.remove("cursor-ready");
      seen = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [isAdmin]);

  if (!enabled || isAdmin) return null;

  return (
    <>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={dotRef} className="cursor-dot">
        <svg className="cursor-arrow" viewBox="0 0 24 28" aria-hidden="true">
          <path d="M2 2 L2 22 L7.5 17 L11.5 26 L15 24.5 L11 15.8 L18.5 15.8 Z" />
        </svg>
      </div>
    </>
  );
}
