import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      'shiki', 
      'next-mdx-remote/rsc',
      '@chakra-ui/react',
      'framer-motion',
      'react-icons/fa',
      'three',
      '@pixiv/three-vrm',
      '@react-three/fiber',
      '@react-three/drei'
    ],
  },
  webpack(config) {
    // Three.js最適化設定
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm': 'three/examples/jsm',
    }

    return config
  },
}

export default withBundleAnalyzer(nextConfig)
