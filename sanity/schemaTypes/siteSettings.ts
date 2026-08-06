import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'Shown under the logo in the footer. e.g. "Where Vision Meets the Frame"',
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "socialInstagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "socialFacebook",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "socialYoutube",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "socialTiktok",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "showreelVideo",
      title: "Showreel Video File",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload your showreel here. Used in the hero 'Watch Our Reel' popup.",
    }),
    defineField({
      name: "showreelUrl",
      title: "Showreel Link (YouTube / Vimeo, optional)",
      type: "url",
      description:
        "Alternative to uploading a file above — paste a YouTube or Vimeo link instead. If both are set, the uploaded file is used.",
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats (the 3 numbers under the homepage headline)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "200+"' }),
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats Section (the 6-number counter section)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value (number only)", type: "number" }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "+"' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
