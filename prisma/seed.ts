// Migrates the placeholder content that used to live in lib/data.ts (as the
// Sanity-fallback data, Phase 1 audit Section 13/14) into real database rows,
// and creates the first admin account. Idempotent: re-running it upserts
// rather than duplicating rows, so it's safe to run again after a schema
// change.
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL || "admin@thecinefilms.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  const existing = await db.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.adminUser.create({
    data: { email, passwordHash, name: "Admin", role: "ADMIN" },
  });
  console.log(`Created admin user: ${email} (change this password after first login)`);
}

async function seedSiteSettings() {
  await db.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      logoUrl: "/images/logo.png",
      tagline: "Where Vision Meets the Frame",
      phone: "+977-XXXXXXXXXX",
      email: "info@thecinefilms.com",
      address: "Pokhara, Kaski, Nepal",
      socialInstagram: "https://instagram.com/thecinefilms__",
      socialFacebook: "https://facebook.com/thecinefilms",
      socialYoutube: "https://youtube.com/@thecinefilms",
      socialTiktok: "https://tiktok.com/@thecinefilms",
      showreelVideoUrl: "/video/cinefilms-showreel.mp4",
      trustedByText: "Brands We've Worked With",
      heroStats: [
        { label: "Projects", value: "200+" },
        { label: "Brands", value: "50+" },
        { label: "Years", value: "5+" },
      ],
      seoTitle: "The Cine Films — Premier Video Production House in Pokhara, Nepal",
      seoDescription:
        "The Cine Films is Pokhara's leading production house specializing in commercial video production, music videos, TVC, drone videography, 3D animation, and AI-powered content for brands across Nepal.",
    },
    update: {},
  });
  console.log("Seeded site settings.");
}

const CLIENT_LOGOS = [
  { name: "Nike", logoUrl: "/images/clients/nike.png", order: 0 },
  { name: "Adidas", logoUrl: "/images/clients/adidas.png", order: 1 },
  { name: "BYD", logoUrl: "/images/clients/byd.png", order: 2 },
  { name: "Himalayan Java", logoUrl: "/images/clients/himalayan-java.png", order: 3 },
];

async function seedClients() {
  const count = await db.client.count();
  if (count > 0) {
    console.log(`Clients already seeded (${count} rows).`);
    return;
  }
  for (const c of CLIENT_LOGOS) {
    await db.client.create({ data: { ...c, active: true } });
  }
  console.log(`Seeded ${CLIENT_LOGOS.length} clients.`);
}

const PROJECTS = [
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

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function seedProjects() {
  const count = await db.portfolioProject.count();
  if (count > 0) {
    console.log(`Portfolio already seeded (${count} rows).`);
    return;
  }
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    await db.portfolioProject.create({
      data: { ...p, slug: slugify(p.title), order: i, status: "PUBLISHED" },
    });
  }
  console.log(`Seeded ${PROJECTS.length} portfolio projects.`);
}

const TEAM = [
  { name: "Sujan Adhikari", role: "Founder / Director" },
  { name: "Nisha Rai", role: "Creative Producer" },
  { name: "Bikash Shrestha", role: "Cinematographer" },
  { name: "Prisha Gurung", role: "Editor / Colorist" },
  { name: "Aarav Basnet", role: "3D Artist" },
  { name: "Manisha KC", role: "Drone Pilot" },
];

async function seedTeam() {
  const count = await db.teamMember.count();
  if (count > 0) {
    console.log(`Team already seeded (${count} rows).`);
    return;
  }
  for (let i = 0; i < TEAM.length; i++) {
    const m = TEAM[i];
    await db.teamMember.create({
      data: { ...m, instagram: "https://instagram.com/thecinefilms__", order: i, active: true },
    });
  }
  console.log(`Seeded ${TEAM.length} team members.`);
}

const TESTIMONIALS = [
  { quote: "The Cine Films turned our product launch into something people actually wanted to watch twice. Every frame felt intentional.", name: "Anjali Gurung", role: "Marketing Lead", company: "Himalayan Java" },
  { quote: "They understood our sound before we finished explaining it. The music video exceeded what we imagined.", name: "Rohit Thapa", role: "Artist", company: "Everest Beats" },
  { quote: "Professional, fast, and genuinely creative. Our corporate film finally looks like the company we actually are.", name: "Sabina Karki", role: "Founder", company: "Trek & Trail Co." },
  { quote: "The drone footage of the lake at sunrise is still the best marketing asset we own.", name: "Prakash Bhattarai", role: "Tourism Officer", company: "Pokhara Tourism Board" },
  { quote: "From the first call to the final grade, they treated our brand like their own. The campaign film is now the first thing customers mention.", name: "Mina Tamang", role: "Founder", company: "Lumbini Living" },
  { quote: "They caught the small moments we would have missed. Watching the film felt like living the whole day over again.", name: "Ritu Sharma", role: "Founder", company: "Sanjhi Weddings" },
];

async function seedTestimonials() {
  const count = await db.testimonial.count();
  if (count > 0) {
    console.log(`Testimonials already seeded (${count} rows).`);
    return;
  }
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i];
    await db.testimonial.create({ data: { ...t, rating: 5, order: i, status: "PUBLISHED" } });
  }
  console.log(`Seeded ${TESTIMONIALS.length} testimonials.`);
}

async function main() {
  await seedAdmin();
  await seedSiteSettings();
  await seedClients();
  await seedProjects();
  await seedTeam();
  await seedTestimonials();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
