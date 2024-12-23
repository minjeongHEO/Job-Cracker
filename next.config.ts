import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'app', '_styles')],
    prependData: `@use "./_variables.scss" as *;`,
  },
};

export default nextConfig;
