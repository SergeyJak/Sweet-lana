/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  async headers() {
    return ['/devices/:file*', '/optimized/:file*'].map(source => ({
      source,
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=86400, stale-while-revalidate=604800'
      }]
    }))
  },
}

module.exports = nextConfig
