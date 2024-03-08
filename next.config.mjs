/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
          {
            source: '/dashboard',
            destination: '/',
            permanent: true,
          },
          {
            source: '/finance',
            destination: '/',
            permanent: true,
          },
          {
            source: '/configurations',
            destination: '/',
            permanent: true,
          },
        ]
      },
      images: {
        domains: ['images.unsplash.com'],
      },
};

export default nextConfig;
