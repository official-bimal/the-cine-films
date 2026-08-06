/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Required for the embedded Sanity Studio (/studio), which uses
  // styled-components internally.
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
