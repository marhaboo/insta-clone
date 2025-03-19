import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Configure images for remote domains
  images: {
    domains: ["instagram-api.softclub.tj"], // Add your image domain here
  },

  // Add custom headers for CORS or other configurations
  async headers() {
    return [
      {
        // Match all routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Update to specific domain for production
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://instagram-api.softclub.tj/:path*", // Correctly map the API path
      },
    ];
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", // Default API URL for development
  },
};

export default nextConfig;
