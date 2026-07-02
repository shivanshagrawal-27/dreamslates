import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.blob.core.windows.net" },
      { protocol: "https", hostname: "*.replicate.delivery" },
      { protocol: "https", hostname: "*.googleapis.com" },
      { protocol: "https", hostname: "**.stability.ai" },
    ],
  },
};

export default nextConfig;
