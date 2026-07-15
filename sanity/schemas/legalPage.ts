import { defineType, defineField } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "key",
      type: "string",
      options: { list: ["privacy", "terms"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
  ],
});
