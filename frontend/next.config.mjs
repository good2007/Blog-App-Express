/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from any external URL so students can paste any image link
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
