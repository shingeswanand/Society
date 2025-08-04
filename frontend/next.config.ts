import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables ESLint from blocking the build
  },
  // You can keep other config options here
};

export default nextConfig;
