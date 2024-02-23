/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
