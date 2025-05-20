import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost:3000', 'localhost:3001','ik.imagekit.io'],
  }
};

export default nextConfig;
