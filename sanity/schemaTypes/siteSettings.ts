import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Shown in the nav bar and footer. Use a horizontal logo with a transparent or black background — it displays small (about 32px tall) in the nav.",
    }),
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
      title: "Hero Background Video",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Plays full-bleed behind the homepage headline (autoplay, muted, looping) — and also opens in the 'Watch Our Reel' popup. Use a short (15-40s), landscape, no-dialogue clip for best results, since it loops silently.",
    }),
    defineField({
      name: "showreelUrl",
      title: "Showreel Link (YouTube / Vimeo, optional)",
      type: "url",
      description:
        "Only used for the 'Watch Our Reel' popup (with sound/controls) — background videos must be an uploaded file above, since YouTube/Vimeo links can't autoplay muted as a page background. If both are set, the uploaded file is used for both.",
    }),
    defineField({
      name: "trustedByText",
      title: "\"Trusted By\" Bar Text",
      type: "string",
      description: 'Shown in a strip right under the hero, e.g. "Trusted by 50+ Clients". Leave empty to hide this bar.',
    }),
    defineField({
      name: "trustedByRating",
      title: "\"Trusted By\" Bar Star Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
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
