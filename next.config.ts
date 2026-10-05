/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from 'next';

const config: NextConfig = {
  // React compiler (experimental)
  reactCompiler: true,

  // Strict mode for better error detection
  reactStrictMode: true,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // TODO: add the production Strapi host and R2 media bucket for Upspace Labs
    ],
    dangerouslyAllowLocalIP: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Environment variables exposed to browser
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Enterprise App',
  },

  // Typed routes (moved from experimental in Next.js 16)
  typedRoutes: true,

  // Turbopack config — empty object silences the webpack-config conflict warning
  turbopack: {},

  // Webpack configuration (used only when --webpack flag is passed)
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Experimental features
  experimental: {},

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default config;
