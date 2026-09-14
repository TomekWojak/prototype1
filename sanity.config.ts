import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes, singletony } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Brakuje konfiguracji Sanity. Skopiuj .env.example do .env.local " +
      "i uzupełnij NEXT_PUBLIC_SANITY_PROJECT_ID oraz NEXT_PUBLIC_SANITY_DATASET.",
  );
}

export default defineConfig({
  name: "ksiega-i-miecz",
  title: "Księga i Miecz — treść strony",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),

    visionTool({ defaultApiVersion: "2026-09-06" }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: () => [],
    actions: (prev, { schemaType }) =>
      singletony.includes(schemaType as (typeof singletony)[number])
        ? prev.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "delete" &&
              action !== "unpublish",
          )
        : prev,
  },
});
