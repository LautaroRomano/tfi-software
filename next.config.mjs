/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_NEW_HOST}/api/:path*`, // Proxy to Backend
      },
      {
        source: '/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOST}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
