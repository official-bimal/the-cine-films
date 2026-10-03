import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from "@/components/SocialIcons";
import { serviceCategories, siteConfig } from "@/lib/data";
import { getSiteSettings } from "@/lib/repositories/site-settings";

// The home page's Nav/Footer are built around in-page anchors (#services,
// #contact) and smooth-scroll handlers, which don't work from another route.
// These are plain-link equivalents for /insights, using the same look.

export async function InsightsHeader() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logoUrl || "/images/logo.png";
  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-line bg-ink/90 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" data-cursor-hover aria-label="The Cine Films, home" className="flex items-center">
          <Image src={logoUrl} alt="The Cine Films" width={113} height={64} priority className="h-8 w-auto object-contain" />
        </Link>
        <ul className="hidden items-center gap-9 md:flex">
          {[
            { label: "Services", href: "/#services" },
            { label: "Work", href: "/#work" },
            { label: "Insights", href: "/insights" },
            { label: "Contact", href: "/#contact" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                data-cursor-hover
                className="font-nav text-[13px] font-normal uppercase tracking-[0.24em] text-muted transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          data-cursor-hover
          className="rounded-full border border-gold px-5 py-2 font-nav text-[12px] font-medium uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}

export async function InsightsFooter() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logoUrl || "/images/logo.png";
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
            <Link href="/" data-cursor-hover aria-label="The Cine Films, home">
              <Image src={logoUrl} alt="The Cine Films" width={127} height={72} className="h-9 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Creative production and digital marketing, based in Pokhara, Nepal.
            </p>
          </div>
          <div>
            <p className="section-label">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "Work", href: "/#work" },
                { label: "Insights", href: "/insights" },
                { label: "Contact", href: "/#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} data-cursor-hover className="transition-colors hover:text-offwhite">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Services</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {serviceCategories.map((c) => (
                <li key={c.title}>
                  <Link href="/#services" data-cursor-hover className="transition-colors hover:text-offwhite">{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted">© 2026 The Cine Films. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href={social.instagram} aria-label="Instagram" data-cursor-hover className="text-muted transition-colors hover:text-gold"><InstagramIcon className="h-5 w-5" /></a>
            <a href={social.facebook} aria-label="Facebook" data-cursor-hover className="text-muted transition-colors hover:text-gold"><FacebookIcon className="h-5 w-5" /></a>
            <a href={social.youtube} aria-label="YouTube" data-cursor-hover className="text-muted transition-colors hover:text-gold"><YoutubeIcon className="h-5 w-5" /></a>
            <a href={social.tiktok} aria-label="TikTok" data-cursor-hover className="text-muted transition-colors hover:text-gold"><TiktokIcon className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
