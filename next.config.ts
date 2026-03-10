import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // @ts-ignore - Turbopack root is experimental but recommended by the CLI when multiple lockfiles are found
    turbopack: {
      root: './',
    },
  },
};

export default nextConfig;
