import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'de-fiesta-con-lyly.b-cdn.net'
            }
        ]
    },
};


export default nextConfig;
