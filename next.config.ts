import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  redirects() {
    return [
      { source: "/panel", destination: "/studio", permanent: false },
      {
        source: "/panel/:path*",
        destination: "/studio/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
