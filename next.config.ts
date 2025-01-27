import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },

  /* config options here */
  // images: {
  //   domains: ['plus.unsplash.com', 'i.pinimg.com', 'cdn.pixabay.com'], // Add allowed domains here
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig;
