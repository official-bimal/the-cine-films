"use client";

import { usePathname } from "next/navigation";

export default function FilmGrain() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <div className="film-grain" aria-hidden="true" />;
}
