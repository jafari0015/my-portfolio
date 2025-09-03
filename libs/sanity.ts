import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "4cja3wup",
  dataset: "production",
  apiVersion: "2025-09-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, 
});
