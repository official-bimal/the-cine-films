/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // YouTube's own video thumbnails, used for portfolio cards.
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
    // Serve AVIF where the browser supports it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Optimised images are cached for a day, in line with the /images header below.
    minimumCacheTTL: 86400,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Files in /public are otherwise served with `max-age=0`, so every
        // repeat visit re-validates each image. Cache them for a day and let
        // browsers reuse a stale copy for a week while they refresh it.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // Video files are big, so cache them for a year. That means a changed
        // video needs a NEW file name (e.g. cinefilms-showreel-2.mp4), not a
        // replacement of the old file.
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Admin-uploaded media (lib/services/media.ts) is written with a
        // content-addressed filename, so it's always safe to cache forever.
        source: "/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
