import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'app', '_styles')],
    prependData: `@use "./_abstracts/variables" as *; 
    @use "./_abstracts/buttons" as *;`,
  },
};

export default nextConfig;
