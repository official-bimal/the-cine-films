// Configuration for the /insights section. Facts only: nothing here is invented.

export const SITE_URL = "https://thecinefilms.com";
export const BASE = "/insights";

export const author = {
  name: "The Cine Films team",
  url: SITE_URL,
};

export const categories = [
  { slug: "digital-marketing", label: "Digital Marketing", commercial: true, description: "Marketing on social, search and paid channels for Nepali businesses.", cta: "Planning a digital marketing campaign?" },
  { slug: "video-production", label: "Video Production", commercial: true, description: "How video gets planned, shot and used, from brief to delivery.", cta: "Planning a professional video?" },
  { slug: "advertising", label: "Advertising", commercial: true, description: "Briefs, creative, media and campaigns.", cta: "Planning an ad campaign?" },
  { slug: "branding", label: "Branding", commercial: true, description: "Identity, positioning and storytelling for brands.", cta: "Working on your brand?" },
  { slug: "business", label: "Business", commercial: false, description: "Entrepreneurship, local business and growth in Nepal.", cta: "" },
  { slug: "technology", label: "Technology", commercial: false, description: "AI and tools shaping marketing and creative work.", cta: "" },
  { slug: "creative-industry", label: "Creative Industry", commercial: false, description: "Film, advertising, design and content work in Nepal.", cta: "" },
  { slug: "pokhara", label: "Pokhara", commercial: true, description: "Business, marketing and creative work in Pokhara.", cta: "Working in Pokhara?" },
  { slug: "kathmandu", label: "Kathmandu", commercial: true, description: "Business, marketing and creative work in Kathmandu.", cta: "Working in Kathmandu?" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categoryBySlug = (slug: string | null | undefined) => categories.find((c) => c.slug === slug);
