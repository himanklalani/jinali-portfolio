import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.114', '192.168.0.105', '192.168.0.101', '192.168.29.61'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'is1-ssl.mzstatic.com' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
    ],
  },
};

export default nextConfig;
