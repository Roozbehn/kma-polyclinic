import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phoneDisplay", type: "string" }),
    defineField({ name: "phoneTel", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "streetAddress", type: "string" }),
    defineField({ name: "whatsappPrimary", type: "string" }),
    defineField({ name: "whatsappFa", type: "string" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "facebook", type: "url" }),
    defineField({ name: "tiktok", type: "url" }),
  ],
});
