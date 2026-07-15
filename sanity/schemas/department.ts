import { defineType, defineField } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "faOnly",
      type: "boolean",
      initialValue: false,
      description: "If true, only publish/show for FA locale (checkup-laboratory).",
    }),
    defineField({
      name: "navPriority",
      type: "number",
      description: "Lower = higher in nav. Eyebrow/hair use low numbers.",
    }),
  ],
});
