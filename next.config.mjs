/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next_dev',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.symlinks = false
    return config
  },
}

export default nextConfig
