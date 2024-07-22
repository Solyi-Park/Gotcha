import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2024-07-22",
  token: process.env.SANITY_SECRET_TOKEN,
};

export const client = createClient(config);
