/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_NEW_HOST || 'https://istp1service.azurewebsites.net'}/api/:path*`, // Proxy to Backend
      },
      {
        source: '/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:8080'}/:path*`, // Proxy to ngrok
      },
    ];
  },
};

export default nextConfig;