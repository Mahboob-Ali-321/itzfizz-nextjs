// Static export so the site can be hosted on GitHub Pages.
// BASE_PATH is set by the GitHub Action to "/<repo-name>".
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
