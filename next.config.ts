import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'app', '_styles')],
    prependData: `@use "./_variables.scss" as *;`,
  },
};

export default nextConfig;
