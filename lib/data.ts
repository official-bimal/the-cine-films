// ---------------------------------------------------------------------------
// PLACEHOLDER CONTENT
// Every array/object in this file is placeholder data so the site can be
// previewed with the correct structure and layout. Swap these values (and
// the referenced /public assets) with real Cine Films content before launch.
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

export const heroStats = [
  { label: "Projects", value: "200+" },
  { label: "Brands", value: "50+" },
  { label: "Years", value: "5+" },
];

// Client logos shown in the "Trusted by" ticker until brands are added in the CMS.
// White-on-transparent client marks in public/images/clients/.
// `height` (px) balances the optical weight of each mark.
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
  // REAL ASSET SLOT: swap the file in public/images/services/ for real photography.
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

export const services: Service[] = serviceCategories.flatMap((c) => c.services);

// Add-ons (like drone) are offered on top of a project, so they aren't counted as core services.
export const coreServiceCount = services.filter((s) => !s.addOn).length;

// PLACEHOLDER figures for the "in numbers" block under the brands strip — confirm before launch.
export const proofPoints = [
  { value: "14+", label: "Industries", tagline: "Countless stories" },
  { value: String(coreServiceCount), label: "Services", tagline: "One studio, every format" },
  { value: "100%", label: "In-House", tagline: "Concept to final cut" },
  { value: "4K", label: "Cinema-Grade", tagline: "Every frame built to stand out" },
  { value: "0", label: "Templates", tagline: "Every story made from scratch" },
  { value: "1", label: "Vision", tagline: "Yours, told cinematically" },
];

export type ProjectCategory = "Marketing" | "Drone" | "Production" | "AI";

export type Project = {
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  externalVideoUrl: string;
};

// PLACEHOLDER videos: real YouTube uploads from major channels (Red Bull, GoPro, ARRI, Apple,
// BBC Earth, DJI, OpenAI, Google) until real project videos are added in the CMS.
// Cards show each video's own YouTube thumbnail.

export const projects: Project[] = [
  { title: "Fewa Sunrise Campaign", category: "Marketing", client: "Himalayan Java", year: "2026", externalVideoUrl: "https://www.youtube.com/watch?v=raiFrxbHxV0" },
  { title: "Above the Annapurnas", category: "Drone", client: "Pokhara Tourism Board", year: "2025", externalVideoUrl: "https://www.youtube.com/watch?v=D_vOqkEgmY0" },
  { title: "Peaks & Echoes", category: "Production", client: "Everest Beats", year: "2026", externalVideoUrl: "https://www.youtube.com/watch?v=jF5_0HMlZNE" },
  { title: "Product in Motion", category: "AI", client: "Gurkha Outfitters", year: "2025", externalVideoUrl: "https://www.youtube.com/watch?v=HK6y8DAPN_0" },
  { title: "Brewed in Sarangkot", category: "Marketing", client: "Sarangkot Coffee", year: "2025", externalVideoUrl: "https://www.youtube.com/watch?v=0VfW6-1DM8Y" },
  { title: "Skyline Reels", category: "Drone", client: "Machapuchare Media", year: "2024", externalVideoUrl: "https://www.youtube.com/watch?v=FV8_3osQgl4" },
  { title: "Lakeside Nights", category: "Production", client: "Lakeside Collective", year: "2025", externalVideoUrl: "https://www.youtube.com/watch?v=OAqBEQ3m0fI" },
  { title: "Render & Reveal", category: "AI", client: "Peace Pagoda Films", year: "2024", externalVideoUrl: "https://www.youtube.com/watch?v=gzneGhpXwjU" },
  { title: "Startup Sprint", category: "Marketing", client: "Nepal Startups", year: "2024", externalVideoUrl: "https://www.youtube.com/watch?v=3bRgp_GSyBQ" },
  { title: "Echoes of the Valley", category: "Drone", client: "Fewa Ventures", year: "2024", externalVideoUrl: "https://www.youtube.com/watch?v=6dnqGrSKudM" },
  { title: "The Trail Ahead", category: "Production", client: "Trek & Trail Co.", year: "2025", externalVideoUrl: "https://www.youtube.com/watch?v=V3dbG9pAi8I" },
  { title: "Banking, Reimagined", category: "AI", client: "Annapurna Bank", year: "2024", externalVideoUrl: "https://www.youtube.com/watch?v=mH7lNroRUiY" },
];

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
    title: "Pre-Production Excellence",
    description:
      "Scripts perfected. Talent aligned. Locations locked. Everything meticulously planned so production runs like clockwork.",
  },
  {
    number: "04",
    title: "Production Magic",
    description:
      "This is where strategy becomes reality. Lights, camera, and the craft that separates good from unforgettable.",
  },
  {
    number: "05",
    title: "Post-Production Alchemy",
    description:
      "Editing, color, sound, VFX, 3D—every frame refined until it's unmissable. This is where obsession shows.",
  },
  {
    number: "06",
    title: "Launch Into Culture",
    description:
      "Optimized for every platform, delivered to make an impact. Your idea doesn't just launch—it lands.",
  },
];

export const whyUs = [
  {
    title: "Marketing. First.",
    description:
      "Most production companies dream in visuals. We think in strategy. Every film, reel, and campaign starts with research and positioning—not aesthetic.",
  },
  {
    title: "Strategy Before Pixels",
    description:
      "A stunning production that doesn't sell is just expensive decoration. We start with research, positioning, audience insight. Then we shoot it.",
  },
  {
    title: "Production Isn't Outsourced",
    description:
      "From concept to final pixel—we own the entire process. That means your brand voice stays consistent. Your timeline stays sane.",
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

// Placeholder portraits: free Pexels photos of Nepali people, cropped and stored in
// /public/images/testimonials. The names and quotes are placeholders too — replace
// all of it with real clients (upload each photo on the Testimonial in /studio).
export const testimonials = [
  {
    quote: "The Cine Films turned our product launch into something people actually wanted to watch twice. Every frame felt intentional.",
    name: "Anjali Gurung",
    role: "Marketing Lead",
    company: "Himalayan Java",
    rating: 5,
    photoUrl: "/images/testimonials/anjali-gurung.jpg",
  },
  {
    quote: "They understood our sound before we finished explaining it. The music video exceeded what we imagined.",
    name: "Rohit Thapa",
    role: "Artist",
    company: "Everest Beats",
    rating: 5,
    photoUrl: "/images/testimonials/rohit-thapa.jpg",
  },
  {
    quote: "Professional, fast, and genuinely creative. Our corporate film finally looks like the company we actually are.",
    name: "Sabina Karki",
    role: "Founder",
    company: "Trek & Trail Co.",
    rating: 5,
    photoUrl: "/images/testimonials/sabina-karki.jpg",
  },
  {
    quote: "The drone footage of the lake at sunrise is still the best marketing asset we own.",
    name: "Prakash Bhattarai",
    role: "Tourism Officer",
    company: "Pokhara Tourism Board",
    rating: 5,
    photoUrl: "/images/testimonials/prakash-bhattarai.jpg",
  },
  {
    quote: "From the first call to the final grade, they treated our brand like their own. The campaign film is now the first thing customers mention.",
    name: "Mina Tamang",
    role: "Founder",
    company: "Lumbini Living",
    rating: 5,
    photoUrl: "/images/testimonials/mina-tamang.jpg",
  },
  {
    quote: "They caught the small moments we would have missed. Watching the film felt like living the whole day over again.",
    name: "Ritu Sharma",
    role: "Founder",
    company: "Sanjhi Weddings",
    rating: 5,
    photoUrl: "/images/testimonials/ritu-sharma.jpg",
  },
];

export const team = [
  { name: "Sujan Adhikari", role: "Founder / Director", instagram: "https://instagram.com/thecinefilms__" },
  { name: "Nisha Rai", role: "Creative Producer", instagram: "https://instagram.com/thecinefilms__" },
  { name: "Bikash Shrestha", role: "Cinematographer", instagram: "https://instagram.com/thecinefilms__" },
  { name: "Prisha Gurung", role: "Editor / Colorist", instagram: "https://instagram.com/thecinefilms__" },
  { name: "Aarav Basnet", role: "3D Artist", instagram: "https://instagram.com/thecinefilms__" },
  { name: "Manisha KC", role: "Drone Pilot", instagram: "https://instagram.com/thecinefilms__" },
];

export const serviceOptions = [...services.map((s) => s.name), "Other"];

export const budgetOptions = [
  "Under NPR 50K", "NPR 50K – 1L", "NPR 1L – 3L", "NPR 3L+", "Not Sure Yet",
];
