import type { StructureResolver } from "sanity/structure";

// Custom dashboard layout: "Site Settings" is pinned at the top as a
// singleton (only one document, no "create new" button), and everything
// else is listed below it as a normal collection you can add/remove from.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("The Cine Films — Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Portfolio Projects (Our Work)"),
      S.documentTypeListItem("brand").title("Clients / Brand Logos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("teamMember").title("Team Members"),
    ]);
