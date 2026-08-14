import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable Turbopack — use webpack for production builds to avoid Turbopack CSS panic
  experimental: {},
};

export default nextConfig;
