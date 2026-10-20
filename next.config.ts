import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Future custom domain support ke liye env se hostname nikalna
const appHostname = process.env.NEXT_PUBLIC_APP_URL
  ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname
  : null

const nextConfig: NextConfig = {
  // 🔥 1. Server Action Body Size Limit (Profile Avatar upload crash rokne ke liye)
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  compress: false,
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    dangerouslyAllowLocalIP: process.env.VERCEL !== '1',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google OAuth avatars
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // For Vercel Blob images
      },
      {
        protocol: 'https',
        hostname: 'google.com', // For Vercel Blob images
      },
      {
        protocol: 'https',
        hostname: 'nutritionist-two.vercel.app', // Aapki live domain
      },
      // ✅ Agar future me koi naya custom domain env me daloge toh automatically allow ho jayega
      ...(appHostname && appHostname !== 'localhost'
        ? [
            {
              protocol: 'https' as const,
              hostname: appHostname,
            },
          ]
        : []),
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Local dev server ke absolute URLs ke liye
      },
    ],
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
