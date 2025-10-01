import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saajra.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "api.saajra.com",  // <-- added this
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.25",
        port: "5002",
        pathname: "/uploads/properties/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
