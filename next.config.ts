import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['images.ctfassets.net'],
  },
};

export default nextConfig;
