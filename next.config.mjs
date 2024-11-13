/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',          // Root URL
          destination: '/Home', // Redirect to /home
          permanent: false,     // Temporary redirect (HTTP 302)
        },
      ];
    },
  };
  
  export default nextConfig;