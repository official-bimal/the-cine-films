// ---------------------------------------------------------------------------
// STATIC ENGINEERING CONFIGURATION
//
// Everything in this file is code-owned content that changes rarely and
// doesn't need a database row: navigation links, the services/process/why-us
// copy, and small default values a few components fall back to if Site
// Settings hasn't been filled in yet.
//
// Portfolio projects, clients/brand logos, team members, and testimonials
// used to live here as CMS-fallback placeholders (Phase 1 of this project,
// when the site was on Sanity). They're now real rows in the database —
// see prisma/seed.ts for the one-time migration of that placeholder content,
// and lib/repositories/* for how components read it. Don't add that kind of
// content back here; it belongs in the database and the /admin dashboard.
// ---------------------------------------------------------------------------

export const siteConfig = {
  name: "The Cine Films",
  tagline: "Where Vision Meets the Frame",
  location: "Pokhara, Nepal",
  instagram: "@thecinefilms__",
  phone: "+977-XXXXXXXXXX",
  email: "info@thecinefilms.com",
  address: "Pokhara, Kaski, Nepal",
  social: {
    instagram: "https://instagram.com/thecinefilms__",
    facebook: "https://facebook.com/thecinefilms",
    youtube: "https://youtube.com/@thecinefilms",
    tiktok: "https://tiktok.com/@thecinefilms",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Used by components/Hero.tsx only when Site Settings has no hero stats set.
export const heroStats = [
  { label: "Projects", value: "200+" },
  { label: "Brands", value: "50+" },
  { label: "Years", value: "5+" },
];

// Used by components/TrustBar.tsx only when there are no active Clients in
// the database. White-on-transparent client marks in public/images/clients/.
export const clientLogos = [
  { name: "Nike", logo: "/images/clients/nike.png", height: 46 },
  { name: "Adidas", logo: "/images/clients/adidas.png", height: 58 },
  { name: "BYD", logo: "/images/clients/byd.png", height: 30 },
  { name: "Himalayan Java", logo: "/images/clients/himalayan-java.png", height: 78 },
];

export type Service = {
  number: string;
  name: string;
  description: string;
  addOn?: boolean;
};

export type ServiceCategory = {
  number: string;
  title: string;
  tag: string;
  description: string;
  featured?: boolean;
  image: string;
  services: Service[];
};

// Order matters: Digital Marketing leads (first, widest card), then Production,
// then the 3D & AI specialty. Service numbers are display-only.
export const serviceCategories: ServiceCategory[] = [
  {
    number: "01",
    title: "Digital Marketing",
    tag: "Where We Lead",
    description: "Content and campaigns that grow your brand, from the first post to paid reach.",
    featured: true,
    image: "/images/services/digital-marketing.jpg",
    services: [
      { number: "01", name: "Social Media Management", description: "Content, calendars and community, handled end to end." },
      { number: "02", name: "Paid Ads & Boosting", description: "Targeted campaigns that turn attention into customers." },
      { number: "03", name: "Ad Shoots & Marketing Videos", description: "Scroll-stopping video, built to sell." },
      { number: "04", name: "Brand Growth Strategy", description: "A clear plan to grow your audience and your revenue." },
    ],
  },
  {
    number: "02",
    title: "Production",
    tag: "We Build Your Story",
    description: "Cinema-grade films, shot on location and finished in-house.",
    image: "/images/services/production.jpg",
    services: [
      { number: "05", name: "Commercials & Ad Films", description: "Cinematic ads that stop the scroll and start conversations." },
      { number: "06", name: "Corporate & Brand Films", description: "Your brand story, told cinematically." },
      { number: "07", name: "Music Videos", description: "Turning sound into visual stories." },
      { number: "08", name: "Event Coverage", description: "Every moment captured, every emotion preserved." },
      { number: "09", name: "Podcast Production", description: "Professional audio-visual podcast setup." },
      { number: "—", name: "Drone Videography", description: "Aerial perspectives, added to any shoot.", addOn: true },
    ],
  },
  {
    number: "03",
    title: "3D & AI Studio",
    tag: "What A Camera Can't Do",
    description: "Worlds, products and ideas that don't exist yet, built with 3D and AI.",
    image: "/images/services/3d-ai.jpg",
    services: [
      { number: "10", name: "3D Animation", description: "Bringing imagination to life in three dimensions." },
      { number: "11", name: "3D Product Visualization", description: "Your product, rendered in stunning detail." },
      { number: "12", name: "AI Video", description: "Next-gen video, powered by artificial intelligence." },
      { number: "13", name: "AI Ad Creatives", description: "Smart ad creatives made with AI precision." },
    ],
  },
];

const services: Service[] = serviceCategories.flatMap((c) => c.services);

// Add-ons (like drone) are offered on top of a project, so they aren't counted as core services.
const coreServiceCount = services.filter((s) => !s.addOn).length;

// PLACEHOLDER figures for the "in numbers" block under the brands strip — confirm before launch.
export const proofPoints = [
  { value: "14+", label: "Industries", tagline: "Countless stories" },
  { value: String(coreServiceCount), label: "Services", tagline: "One studio, every format" },
  { value: "100%", label: "In-House", tagline: "Concept to final cut" },
  { value: "4K", label: "Cinema-Grade", tagline: "Every frame built to stand out" },
  { value: "0", label: "Templates", tagline: "Every story made from scratch" },
  { value: "1", label: "Vision", tagline: "Yours, told cinematically" },
];

// Matches lib/validations/portfolio.ts's PROJECT_CATEGORIES — kept in sync
// manually since one is a display list and the other is a validated enum.
export const filterTabs = ["All", "Marketing", "Drone", "Production", "AI"];

export const processSteps = [
  {
    number: "01",
    title: "We Listen First",
    description:
      "Before we shoot a single frame, we understand what you're really trying to say—and why it matters.",
  },
  {
    number: "02",
    title: "Strategy Over Aesthetics",
    description:
      "A beautiful film that doesn't convert is just a beautiful film. We map the strategy that makes your idea unstoppable.",
  },
  {
    number: "03",
    title: "Pre-Production Preparation",
    description:
      "Scripts perfected. Talent aligned. Locations locked. Everything meticulously planned so production runs like clockwork.",
  },
  {
    number: "04",
    title: "Production Execution",
    description:
      "This is where strategy becomes reality. Lights, camera, and the craft that separates good from unforgettable.",
  },
  {
    number: "05",
    title: "Post-Production Refinement",
    description:
      "Editing, color, sound, VFX, 3D—every frame refined until it's unmissable. This is where obsession shows.",
  },
  {
    number: "06",
    title: "Launch Into Impact",
    description:
      "Optimized for every platform, delivered to make an impact. Your idea doesn't just launch—it lands.",
  },
];

export const whyUs = [
  {
    title: "Marketing. First.",
    description:
      "Most production companies dream in visuals. We think in strategy. Every film, reel, and campaign starts with research and positioning not aesthetic.",
  },
  {
    title: "Strategy Before Pixels",
    description:
      "A stunning production that doesn't sell is just expensive decoration. We start with research, positioning, audience insight. Then we shoot it.",
  },
  {
    title: "Production Isn't Outsourced",
    description:
      "From concept to final pixel we own the entire process. That means your brand voice stays consistent. Your timeline stays sane.",
  },
  {
    title: "AI. For Speed, Not Shortcuts.",
    description:
      "Modern tech lets us deliver premium work faster. Advanced editing, color workflows, content optimization—we use AI to be more efficient, not less thoughtful. Your timeline shrinks. Your quality doesn't.",
  },
  {
    title: "Built for Brands Like Yours.",
    description:
      "We started in Pokhara building obsessions on tight budgets. Now in Kathmandu doing the same. We know how to make small brands sound and look like big ones.",
  },
];
