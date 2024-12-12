/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://istp1service.azurewebsites.net/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
