import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";

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

const siteUrl = "https://thecinefilms.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Cine Films — Premier Video Production House in Pokhara, Nepal",
  description:
    "The Cine Films is Pokhara's leading production house specializing in commercial video production, music videos, TVC, drone videography, 3D animation, and AI-powered content for brands across Nepal.",
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
    title: "The Cine Films — Premier Video Production House in Pokhara, Nepal",
    description:
      "Commercial films, music videos, TVCs, drone videography, 3D animation and AI-powered content — crafted cinematically in Pokhara, Nepal.",
    url: siteUrl,
    siteName: "The Cine Films",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cine Films — Premier Video Production House in Pokhara, Nepal",
    description:
      "Pokhara's premier production house — commercial films, music videos, 3D animation & AI-powered content.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/VideoProductionCompany",
  name: "The Cine Films",
  description:
    "Premier video production house in Pokhara, Nepal specializing in commercial films, music videos, TVCs, drone videography, 3D animation and AI-powered content.",
  url: siteUrl,
  telephone: "+977-XXXXXXXXXX",
  email: "info@thecinefilms.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pokhara",
    addressRegion: "Kaski",
    addressCountry: "NP",
  },
  sameAs: [
    "https://instagram.com/thecinefilms__",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
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
