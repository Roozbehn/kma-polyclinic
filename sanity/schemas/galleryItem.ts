import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "department", type: "reference", to: [{ type: "department" }] }),
    defineField({ name: "beforeAfter", type: "boolean", initialValue: false }),
  ],
});
