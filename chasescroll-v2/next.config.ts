import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    optimizeServerReact: true,
    optimisticClientCache: true
  },
};

export default nextConfig;
