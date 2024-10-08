/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // (https://linked-posts.routemisr.com/uploads/default-profile.png)
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
