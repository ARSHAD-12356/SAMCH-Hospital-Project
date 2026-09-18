/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/Assets/:path*',
        destination: '/assets/:path*',
      },
    ]
  },
  webpack: (config) => {
    config.resolve.symlinks = false
    return config
  },
}

export default nextConfig
