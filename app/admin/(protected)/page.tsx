import Link from "next/link";
import { db } from "@/lib/db";
import { card, pageSubtitle, pageTitle } from "@/lib/admin-ui";

export default async function AdminDashboardPage() {
  const [projectsTotal, projectsPublished, clientsActive, teamActive, testimonialsPublished] = await Promise.all([
    db.portfolioProject.count(),
    db.portfolioProject.count({ where: { status: "PUBLISHED" } }),
    db.client.count({ where: { active: true } }),
    db.teamMember.count({ where: { active: true } }),
    db.testimonial.count({ where: { status: "PUBLISHED" } }),
  ]);

  const tiles = [
    { label: "Portfolio Projects", value: projectsTotal, href: "/admin/portfolio" },
    { label: "Published Projects", value: projectsPublished, href: "/admin/portfolio" },
    { label: "Active Clients", value: clientsActive, href: "/admin/clients" },
    { label: "Team Members", value: teamActive, href: "/admin/team" },
    { label: "Published Testimonials", value: testimonialsPublished, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className={pageTitle}>Dashboard</h1>
      <p className={pageSubtitle}>A quick look at what&apos;s live on the site right now.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href} className={`${card} block p-5 transition-shadow hover:shadow-md`}>
            <p className="text-2xl font-semibold text-neutral-900">{tile.value}</p>
            <p className="mt-1 text-xs text-neutral-500">{tile.label}</p>
          </Link>
        ))}
      </div>

      <div className={`${card} mt-8 p-6`}>
        <h2 className="text-sm font-semibold text-neutral-900">Getting started</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
          <li>
            Fill in <Link href="/admin/site-settings" className="text-neutral-900 underline">Site Settings</Link> first —
            the logo, contact info, showreel, and hero stats every other page pulls from.
          </li>
          <li>
            Add your real work in <Link href="/admin/portfolio" className="text-neutral-900 underline">Portfolio</Link>,
            then set each project to Published when it&apos;s ready to go live.
          </li>
          <li>
            <Link href="/admin/media" className="text-neutral-900 underline">Media Library</Link> keeps every uploaded
            image/video in one place — reuse an asset instead of re-uploading it.
          </li>
        </ul>
      </div>
    </div>
  );
}
