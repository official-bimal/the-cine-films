import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Commercials", "Music Videos", "Corporate", "3D", "Drone"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Shows in the portfolio grid.",
    }),
    defineField({
      name: "video",
      title: "Video File (optional)",
      type: "file",
      options: { accept: "video/*" },
      description: "Plays in the lightbox when someone clicks this project. Leave empty if using the link below instead.",
    }),
    defineField({
      name: "externalVideoUrl",
      title: "Video Link (YouTube / Vimeo, optional)",
      type: "url",
      description: "Alternative to uploading a file above.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first. Leave blank to sort by newest.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "thumbnail" },
  },
});
