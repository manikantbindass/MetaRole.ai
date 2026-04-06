import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // App router is stable in Next.js 14
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://metarole-backend.vercel.app/api/:path*',
      },
    ]
  },
}

export default nextConfig
