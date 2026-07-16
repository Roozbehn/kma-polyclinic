import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import {
  department,
  service,
  page,
  galleryItem,
  legalPage,
  siteSettings,
  leadSubmission,
} from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const isBrowser = typeof window !== "undefined";

export default defineConfig({
  name: "kma-polyclinic",
  title: "KMA PolyClinic",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),
    // Load only in the browser — Sanity CLI workers choke on this plugin / icons graph.
    ...(isBrowser
      ? [
          documentInternationalization({
            supportedLanguages: [
              { id: "tr", title: "Turkish" },
              { id: "en", title: "English" },
              { id: "fa", title: "Persian" },
              { id: "ar", title: "Arabic" },
            ],
            schemaTypes: ["department", "service", "page", "galleryItem", "legalPage"],
          }),
        ]
      : []),
  ],
  schema: {
    types: [
      department,
      service,
      page,
      galleryItem,
      legalPage,
      siteSettings,
      leadSubmission,
    ],
  },
});
