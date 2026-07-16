import { defineType, defineField } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "language", type: "string", readOnly: true, hidden: true }),
    defineField({
      name: "key",
      type: "string",
      options: { list: ["home", "about", "contact"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            { name: "body", type: "text" },
          ],
        },
      ],
    }),
  ],
});
