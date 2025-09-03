import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"], // Add Sanity's CDN here
  },
  reactStrictMode: true,
};

export default nextConfig;
