import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "department", type: "reference", to: [{ type: "department" }] }),
    defineField({ name: "priority", type: "boolean", initialValue: false }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
  ],
});
