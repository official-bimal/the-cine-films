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

export const brands = [
  "Himalayan Java", "Fewa Ventures", "Pokhara Tourism Board", "Annapurna Bank",
  "Everest Beats", "Lakeside Collective", "Sarangkot Coffee", "Nepal Startups",
  "Trek & Trail Co.", "Machapuchare Media", "Gurkha Outfitters", "Peace Pagoda Films",
];

export type Service = {
  number: string;
  name: string;
  description: string;
};

export const services: Service[] = [
  { number: "01", name: "Commercial Video Production", description: "Ads that stop the scroll and start conversations." },
  { number: "02", name: "Music Video Production", description: "Turning sound into visual stories." },
  { number: "03", name: "TVC / DVC Production", description: "Television & digital commercials that sell." },
  { number: "04", name: "Corporate Films", description: "Your brand story, told cinematically." },
  { number: "05", name: "Drone Videography", description: "Aerial perspectives that elevate your vision." },
  { number: "06", name: "Event Coverage", description: "Every moment captured, every emotion preserved." },
  { number: "07", name: "AI Video Production", description: "Next-gen content powered by artificial intelligence." },
  { number: "08", name: "AI Commercial Ads", description: "Smart ads created with AI precision." },
  { number: "09", name: "3D Animation", description: "Bringing imagination to life in three dimensions." },
  { number: "10", name: "3D Product Visualization", description: "Your product, rendered in stunning detail." },
  { number: "11", name: "Podcast Production", description: "Professional audio-visual podcast setup." },
  { number: "12", name: "Brand Growth Solutions", description: "Strategy + content that scales your business." },
];

export type Project = {
  title: string;
  category: "Commercials" | "Music Videos" | "Corporate" | "3D" | "Drone";
  client: string;
  year: string;
};

export const projects: Project[] = [
  { title: "Fewa Sunrise Campaign", category: "Commercials", client: "Himalayan Java", year: "2026" },
  { title: "Peaks & Echoes", category: "Music Videos", client: "Everest Beats", year: "2026" },
  { title: "Above the Annapurnas", category: "Drone", client: "Pokhara Tourism Board", year: "2025" },
  { title: "The Trail Ahead", category: "Corporate", client: "Trek & Trail Co.", year: "2025" },
  { title: "Lakeside Nights", category: "Music Videos", client: "Lakeside Collective", year: "2025" },
  { title: "Brewed in Sarangkot", category: "Commercials", client: "Sarangkot Coffee", year: "2025" },
  { title: "Product in Motion", category: "3D", client: "Gurkha Outfitters", year: "2025" },
  { title: "Banking Reimagined", category: "Corporate", client: "Annapurna Bank", year: "2024" },
  { title: "Skyline Reels", category: "Drone", client: "Machapuchare Media", year: "2024" },
  { title: "Startup Sprint", category: "Commercials", client: "Nepal Startups", year: "2024" },
  { title: "Render & Reveal", category: "3D", client: "Peace Pagoda Films", year: "2024" },
  { title: "Echoes of the Valley", category: "Music Videos", client: "Fewa Ventures", year: "2024" },
];

export const filterTabs = ["All", "Commercials", "Music Videos", "Corporate", "3D", "Drone"];

export const processSteps = [
  { number: "01", title: "Discovery Call", description: "We listen to your vision, goals, and story." },
  { number: "02", title: "Creative Strategy", description: "We craft a tailored plan and storyboard." },
  { number: "03", title: "Pre-Production", description: "Scripting, casting, location scouting, scheduling." },
  { number: "04", title: "Production", description: "Lights, camera, action — we bring it to life." },
  { number: "05", title: "Post-Production", description: "Editing, color grading, sound design, VFX/3D." },
  { number: "06", title: "Delivery & Launch", description: "Final output optimized for every platform." },
];

export const whyUs = [
  { title: "Cinematic Quality, Every Frame", description: "We shoot with cinema-grade equipment." },
  { title: "AI-Powered Innovation", description: "Cutting-edge AI tools for modern content." },
  { title: "End-to-End Production", description: "From concept to final delivery, we handle it all." },
  { title: "Pokhara's Local Experts", description: "We know the locations, light, and landscape." },
  { title: "Fast Turnaround", description: "Professional results delivered on time." },
  { title: "Affordable Premium", description: "World-class production at Nepal-friendly pricing." },
];

export const stats = [
  { label: "Projects Completed", value: 200, suffix: "+" },
  { label: "Happy Clients", value: 50, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Team Members", value: 10, suffix: "+" },
  { label: "Videos Produced", value: 500, suffix: "+" },
  { label: "Districts Served", value: 30, suffix: "+" },
];

export const equipment = [
  { name: "Sony FX6", category: "Cinema Camera" },
  { name: "DJI Mavic 3", category: "Drone" },
  { name: "DaVinci Resolve", category: "Color Grading" },
  { name: "After Effects", category: "VFX & Motion" },
  { name: "Blender", category: "3D Animation" },
  { name: "Runway AI", category: "AI Generation" },
  { name: "DJI RS3 Pro", category: "Gimbal" },
  { name: "Rode Wireless Pro", category: "Audio" },
];

export const testimonials = [
  {
    quote: "The Cine Films turned our product launch into something people actually wanted to watch twice. Every frame felt intentional.",
    name: "Anjali Gurung",
    role: "Marketing Lead",
    company: "Himalayan Java",
    rating: 5,
  },
  {
    quote: "They understood our sound before we finished explaining it. The music video exceeded what we imagined.",
    name: "Rohit Thapa",
    role: "Artist",
    company: "Everest Beats",
    rating: 5,
  },
  {
    quote: "Professional, fast, and genuinely creative. Our corporate film finally looks like the company we actually are.",
    name: "Sabina Karki",
    role: "Founder",
    company: "Trek & Trail Co.",
    rating: 5,
  },
  {
    quote: "The drone footage of the lake at sunrise is still the best marketing asset we own.",
    name: "Prakash Bhattarai",
    role: "Tourism Officer",
    company: "Pokhara Tourism Board",
    rating: 5,
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

export const serviceOptions = [
  "Commercial Video", "Music Video", "TVC/DVC", "Corporate Film", "Drone Videography",
  "Event Coverage", "AI Video Production", "3D Animation / Visualization", "Podcast Production", "Other",
];

export const budgetOptions = [
  "Under NPR 50K", "NPR 50K – 1L", "NPR 1L – 3L", "NPR 3L+", "Not Sure Yet",
];
