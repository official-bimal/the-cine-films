import { InstagramIcon } from "./SocialIcons";
import { team as placeholderTeam } from "@/lib/data";
import { sanityFetch } from "@/sanity/lib/fetch";
import { TEAM_QUERY } from "@/sanity/lib/queries";
import ScrollReveal from "./ScrollReveal";

type Member = { _id: string; name: string; role: string; instagram: string | null; photoUrl: string | null };

export default async function Team() {
  const cmsTeam = await sanityFetch<Member[]>(TEAM_QUERY);
  const team: Member[] =
    cmsTeam && cmsTeam.length > 0
      ? cmsTeam
      : placeholderTeam.map((m, i) => ({ _id: `placeholder-${i}`, name: m.name, role: m.role, instagram: m.instagram, photoUrl: null }));

  return (
    <section className="bg-ink py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <p className="section-label">The Team</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[0.95] text-offwhite sm:text-5xl">
            The Faces Behind The Lens
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {team.map((member, i) => (
            <ScrollReveal key={member._id} delay={(i % 6) * 0.05}>
              <a
                href={member.instagram || "#"}
                data-cursor-hover
                className="group block text-center"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line placeholder-tile grayscale transition-all duration-500 group-hover:grayscale-0">
                  {member.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display text-3xl text-muted/40">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    <InstagramIcon className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 font-display text-sm uppercase text-offwhite">
                  {member.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted">
                  {member.role}
                </p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
