import { Camera } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { navLinks, services, siteConfig } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type Settings = {
  tagline: string | null;
  socialInstagram: string | null;
  socialFacebook: string | null;
  socialYoutube: string | null;
};

export default async function Footer() {
  const settings = await sanityFetch<Settings>(SITE_SETTINGS_QUERY);
  const tagline = settings?.tagline || siteConfig.tagline;
  const social = {
    instagram: settings?.socialInstagram || siteConfig.social.instagram,
    facebook: settings?.socialFacebook || siteConfig.social.facebook,
    youtube: settings?.socialYoutube || siteConfig.social.youtube,
  };

  return (
    <footer className="relative border-t border-line bg-ink pt-16">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(90deg,#D4A853_0px,#D4A853_10px,transparent_10px,transparent_20px)] opacity-30"
      />

      <div className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 font-display text-xl text-offwhite">
              <Camera className="h-5 w-5 text-gold" strokeWidth={1.5} />
              THE CINE FILMS
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted">
              {tagline} — Pokhara&apos;s premier production house crafting commercial
              films, music videos, and AI-powered content for brands across Nepal.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest2 text-gold">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-offwhite">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest2 text-gold">Services</h4>
            <ul className="mt-4 space-y-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.number} className="text-sm text-muted">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted">
            © 2026 The Cine Films. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={social.instagram} aria-label="Instagram" data-cursor-hover className="text-muted hover:text-gold">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={social.facebook} aria-label="Facebook" data-cursor-hover className="text-muted hover:text-gold">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href={social.youtube} aria-label="YouTube" data-cursor-hover className="text-muted hover:text-gold">
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="font-mono text-xs text-muted">
            Designed &amp; built by{" "}
            <a
              href="https://www.instagram.com/bimalbhandari_/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="text-muted hover:text-gold"
            >
              Bimal Bhandari
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
