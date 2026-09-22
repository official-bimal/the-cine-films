import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cormorant_Garamond, Playfair_Display, Pinyon_Script, Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import { getSiteSettings } from "@/lib/repositories/site-settings";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Only used as the text fallback for a brand logo in the "Trusted by" ticker, so
// it isn't preloaded: the browser fetches it only if that text actually renders.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-luxury",
  display: "swap",
  preload: false,
});

// The hero tagline is the only place this is used (at font-medium, 500).
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-premium",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nav",
  display: "swap",
});

const siteUrl = "https://thecinefilms.com";

const DEFAULT_TITLE = "The Cine Films — Premier Video Production House in Pokhara, Nepal";
const DEFAULT_DESCRIPTION =
  "The Cine Films is Pokhara's leading production house specializing in commercial video production, music videos, TVC, drone videography, 3D animation, and AI-powered content for brands across Nepal.";

// SEO title/description/OG image now come from Site Settings (editable in
// /admin) instead of being hardcoded — Phase 1 audit Section 18/19 flagged
// this as static and the OG image as broken (referencing a file that didn't
// exist). generateMetadata() can be async, so this reads the database
// directly rather than needing a separate fetch layer.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle || DEFAULT_TITLE;
  const description = settings?.seoDescription || DEFAULT_DESCRIPTION;
  // Only include an OG/Twitter image if one is actually configured — an
  // absent image is invisible; a configured-but-missing file (the old bug)
  // shows a broken image on every share.
  const images = settings?.ogImageUrl ? [{ url: settings.ogImageUrl, width: 1200, height: 630 }] : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "video production Pokhara",
      "production house Nepal",
      "music video production Pokhara",
      "commercial video Nepal",
      "drone videography Pokhara",
      "3D animation Nepal",
      "AI video production",
      "TVC production Nepal",
      "corporate film Pokhara",
      "The Cine Films",
    ],
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "The Cine Films",
      images,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((i) => i.url),
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    additionalType: "https://schema.org/VideoProductionCompany",
    name: "The Cine Films",
    description: settings?.seoDescription || DEFAULT_DESCRIPTION,
    url: siteUrl,
    // Falls back to the code-level default rather than shipping a literal
    // placeholder like "+977-XXXXXXXXXX" — Phase 1 audit Section 19/34: fill
    // in the real number in Site Settings before launch.
    telephone: settings?.phone || siteConfig.phone,
    email: settings?.email || siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pokhara",
      addressRegion: "Kaski",
      addressCountry: "NP",
    },
    sameAs: [settings?.socialInstagram || siteConfig.social.instagram].filter(Boolean),
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable} ${playfair.variable} ${pinyon.variable} ${jost.variable}`}>
      <head>
        {/* Open the connections to Fontshare early: the stylesheet and the font files it points to come from two different hosts. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        {/* Clash Display via Fontshare — matches brand display typography from the design brief */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-offwhite antialiased">
        <SmoothScroll>
          <CustomCursor />
          <FilmGrain />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
