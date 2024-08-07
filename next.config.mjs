/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/hangman-game-nextjs/" : "",
};

export default nextConfig;
