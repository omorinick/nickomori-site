import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/projects/pattern-gallery',
        destination: '/pattern-gallery.html',
      },
    ]
  },
};

export default nextConfig;
