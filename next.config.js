/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove the rewrites as they might interfere with Next.js routing
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: '/',
  //     },
  //   ];
  // },
}

module.exports = nextConfig 