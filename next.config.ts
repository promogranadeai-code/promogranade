import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  experimental: {
    // Tree-shake icon/animation libraries so only used exports are bundled
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
    ],
  },

  compiler: {
    // Strip console.* calls from production builds
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
