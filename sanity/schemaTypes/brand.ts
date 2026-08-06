import { defineField, defineType } from "sanity";

export default defineType({
  name: "brand",
  title: "Client / Brand Logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client / Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Optional — if left empty, the brand name is shown as text instead.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first.",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
