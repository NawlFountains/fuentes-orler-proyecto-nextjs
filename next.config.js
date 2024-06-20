/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dzbaziutc/**',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dzbaziutc/**',
            },
        ],
    }
};

module.exports = nextConfig;
