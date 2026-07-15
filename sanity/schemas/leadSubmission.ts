import { defineType, defineField } from "sanity";

export const leadSubmission = defineType({
  name: "leadSubmission",
  title: "Lead Submission",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "locale", type: "string" }),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "message", type: "text" }),
    defineField({ name: "createdAt", type: "datetime" }),
  ],
});
