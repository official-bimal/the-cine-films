"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    title: "Content",
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      { href: "/admin/site-settings", label: "Site Settings" },
      { href: "/admin/portfolio", label: "Portfolio" },
      { href: "/admin/clients", label: "Clients" },
      { href: "/admin/team", label: "Team" },
      { href: "/admin/testimonials", label: "Testimonials" },
    ],
  },
  {
    title: "Media",
    items: [{ href: "/admin/media", label: "Media Library" }],
  },
  {
    title: "System",
    items: [{ href: "/admin/account", label: "Admin Account" }],
  },
];

export default function AdminNav({
  adminEmail,
  logoutAction,
}: {
  adminEmail: string;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-5 py-5">
        <p className="font-display text-sm font-semibold uppercase tracking-wide text-neutral-900">The Cine Films</p>
        <p className="mt-0.5 text-xs text-neutral-500">Content Dashboard</p>
      </div>

      <nav className="px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                        active ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-neutral-200 px-5 py-4">
        <p className="truncate text-xs text-neutral-500">{adminEmail}</p>
        <form action={logoutAction} className="mt-2">
          <button type="submit" className="text-xs font-medium text-neutral-600 hover:text-neutral-900">
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
