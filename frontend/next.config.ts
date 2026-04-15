const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: import("next").NextConfig = withPWA({
  /* config options here */
});

export default nextConfig;
