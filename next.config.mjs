import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'shiki',
      '@chakra-ui/react',
      'framer-motion',
      'react-icons/fa',
      'three',
      '@pixiv/three-vrm',
      '@react-three/fiber',
      '@react-three/drei'
    ],
  },
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https: https://raw.githack.com https://raw.githubusercontent.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' blob: https://www.google-analytics.com https://stats.g.doubleclick.net https://raw.githack.com https://raw.githubusercontent.com; frame-src 'self' https://www.youtube.com https://platform.twitter.com; worker-src 'self' blob:; object-src 'none';",
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
