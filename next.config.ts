import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, 'app', '_styles')],
    prependData: `@use "./_abstracts/_variables" as *; 
    @use "./_abstracts/_buttons" as *;
    @use "./_abstracts/_mixins" as *;`,
  },
  sever: {
    port: 3000,
  },
};

export default nextConfig;
