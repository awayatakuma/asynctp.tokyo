/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['shiki', 'next-mdx-remote/rsc'],
  },
}

export default nextConfig
