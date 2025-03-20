/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  experimental: {
    metadataBase: 'https://themoviedb.com',
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;

