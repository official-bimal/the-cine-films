"use client";

import { usePathname } from "next/navigation";

export default function FilmGrain() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <div className="film-grain" aria-hidden="true" />;
}
