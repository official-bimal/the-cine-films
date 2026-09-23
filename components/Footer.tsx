import Image from "next/image";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from "./SocialIcons";
import { navLinks, serviceCategories, siteConfig } from "@/lib/data";
import { getSiteSettings } from "@/lib/repositories/site-settings";

export default async function Footer() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logoUrl || "/images/logo.png";
  const tagline = settings?.tagline || siteConfig.tagline;
  const social = {
    instagram: settings?.socialInstagram || siteConfig.social.instagram,
    facebook: settings?.socialFacebook || siteConfig.social.facebook,
    youtube: settings?.socialYoutube || siteConfig.social.youtube,
    tiktok: settings?.socialTiktok || siteConfig.social.tiktok,
  };

  return (
    <footer className="border-t border-line bg-ink pt-16">
      <div className="mx-auto max-w-[1240px] px-6 pb-10 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#home" data-cursor-hover className="flex items-center gap-2 font-display text-xl text-offwhite">
              {/* Shown 36px tall; the width/height here (2x) only size the file that gets fetched. */}
              <Image src={logoUrl} alt="The Cine Films" width={127} height={72} className="h-9 w-auto object-contain" />
            </a>
            <p className="mt-5 font-display text-lg uppercase leading-tight text-offwhite">{tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              We&apos;re the marketing team that also shoots films. Built for brands with ambition.
            </p>
          </div>

          <div>
            <p className="section-label">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-cursor-hover
                    className="text-sm text-muted transition-colors hover:text-offwhite"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">Services</p>
            <ul className="mt-5 space-y-3">
              {serviceCategories.map((c) => (
                <li key={c.title}>
                  <a
                    href="#services"
                    data-cursor-hover
                    className="text-sm text-muted transition-colors hover:text-offwhite"
                  >
                    {c.title}
                  </a>
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
            <a href={social.instagram} aria-label="Instagram" data-cursor-hover className="text-muted transition-colors hover:text-gold">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={social.facebook} aria-label="Facebook" data-cursor-hover className="text-muted transition-colors hover:text-gold">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href={social.youtube} aria-label="YouTube" data-cursor-hover className="text-muted transition-colors hover:text-gold">
              <YoutubeIcon className="h-5 w-5" />
            </a>
            <a href={social.tiktok} aria-label="TikTok" data-cursor-hover className="text-muted transition-colors hover:text-gold">
              <TiktokIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="font-mono text-xs text-muted">By The Cinefilms Team</p>
        </div>
      </div>
    </footer>
  );
}
