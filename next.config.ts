import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.25",
        port: "5002",
        pathname: "/uploads/properties/**",
      },
      {
        protocol: 'https',
        // hostname: 'mainge-api.volvrit.org',
        hostname: 'api.saajra.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
   eslint: {
    ignoreDuringBuilds: true, // <-- add this line
  },
};

export default nextConfig;